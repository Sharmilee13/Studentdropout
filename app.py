from flask import Flask, request, jsonify
import pickle
import pandas as pd
import numpy as np
from flask_cors import CORS
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, silhouette_score

app = Flask(__name__)

# ✅ Enable Robust CORS for React
CORS(app, resources={r"/*": {"origins": "*"}})

# --- 1. LOAD MODELS AND COLUMNS ---
try:
    models = {
        "logistic": pickle.load(open("models/logistic.pkl", "rb")),
        "rf": pickle.load(open("models/rf.pkl", "rb")),
        "rf_bal": pickle.load(open("models/rf_bal.pkl", "rb")),
        "dt": pickle.load(open("models/dt.pkl", "rb")),
        "xgb": pickle.load(open("models/xgb.pkl", "rb")),
        "lgb": pickle.load(open("models/lgb.pkl", "rb")),
        "kmeans": pickle.load(open("models/kmeans.pkl", "rb")),
    }
    columns = pickle.load(open("models/columns.pkl", "rb"))
    print("✅ All models and columns loaded successfully.")
except Exception as e:
    print(f"❌ Error loading models: {e}")

# --- 2. LOAD DATASET ---
X_test, y_test = None, None
try:
    path = r"C:\Users\prust\OneDrive\Desktop\codebase\student dropout\data\Dropout (1).csv"
    test_df = pd.read_csv(path)
    
    # Clean headers
    test_df.columns = test_df.columns.str.strip().str.lower()
    model_cols_lower = [col.strip().lower() for col in columns]
    column_mapping = dict(zip(model_cols_lower, columns))
    test_df = test_df.rename(columns=column_mapping)

    # Label Mapping
    label_map = {"dropout": 0, "enrolled": 1, "graduate": 2}
    
    if 'target' in test_df.columns:
        y_test = test_df['target'].str.strip().str.lower().map(label_map)
    else:
        y_test = test_df.iloc[:, -1]

    X_test = test_df[columns].fillna(0)
    print("✅ Test data matched and labels mapped.")
except Exception as e:
    print(f"⚠️ Data Loading Error: {e}")

# --- 3. ROUTES ---
@app.route('/')
def home():
    return "Flask backend is running 🚀"
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data_json = request.get_json()
        model_type = data_json["model"]
        values = data_json["values"]

        data = pd.DataFrame([values], columns=columns)
        model = models[model_type]

        if model_type == "kmeans":
            result = int(model.predict(data)[0])
            return jsonify({"result": f"Cluster {result}", "confidence": 1.0})
        
        pred = int(model.predict(data)[0])
        prob = float(model.predict_proba(data)[0].max())
        
        mapping = {0: "Dropout Risk", 1: "Enrolled", 2: "Graduate"}
        return jsonify({
            "result": mapping.get(pred, "Unknown"),
            "confidence": round(prob, 2)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/metrics', methods=['GET'])
def get_metrics():
    if X_test is None or y_test is None:
        return jsonify({"error": "Data not loaded"}), 500

    supervised_list = []
    unsupervised_list = []
    
    valid_mask = y_test.notnull()
    X_eval = X_test[valid_mask]
    y_eval = y_test[valid_mask]

    for name, model in models.items():
        try:
            if name == "kmeans":
                # K-Means Specific Metrics
                cluster_labels = model.predict(X_eval)
                sil = silhouette_score(X_eval, cluster_labels, sample_size=1000)
                
                unsupervised_list.append({
                    "name": "K-Means Clustering",
                    "silhouette": f"{round(float(sil), 3)}",
                    "inertia": f"{int(model.inertia_ / 1000)}k"
                })
            else:
                # Classification Metrics
                y_pred = model.predict(X_eval)
                acc = accuracy_score(y_eval, y_pred)
                pre = precision_score(y_eval, y_pred, average='weighted', zero_division=0)
                rec = recall_score(y_eval, y_pred, average='weighted', zero_division=0)
                f1 = f1_score(y_eval, y_pred, average='weighted', zero_division=0)

                supervised_list.append({
                    "name": name.upper(),
                    "acc": f"{float(acc)*100:.1f}%",
                    "pre": f"{float(pre)*100:.1f}%",
                    "rec": f"{float(rec)*100:.1f}%",
                    "f1": f"{float(f1):.2f}"
                })
        except Exception as e:
            print(f"Metrics Error for {name}: {e}")

    # Returning structured object for React
    return jsonify({
        "supervised": supervised_list,
        "unsupervised": unsupervised_list
    })

@app.route('/importance', methods=['GET'])
def get_importance():
    try:
        rf_model = models['rf']
        importances = rf_model.feature_importances_
        feat_data = sorted(zip(columns, importances), key=lambda x: x[1], reverse=True)[:10]
        return jsonify([{"name": f[0], "value": round(float(f[1]) * 100, 1)} for f in feat_data])
    except Exception as e:
        return jsonify([])

@app.route('/cluster-info', methods=['GET'])
def get_cluster_info():
    # Simple predefined info for the K-Means clusters logic
    cluster_info = {
        0: {
            "name": "High-Risk Behavior Pattern",
            "description": "Students in this cluster show strong signs of disengagement. They frequently miss evaluations, have low tuition payment rates, and often struggle academically in the first semester.",
            "traits": ["Low 1st sem grade", "Tuition arrears", "High missing evaluations"]
        },
        1: {
            "name": "Stable / Typical Enrolled",
            "description": "This cluster represents the average active student. They maintain decent grades and keep up with their financial obligations, but might still have specific academic hurdles.",
            "traits": ["Average grades", "Tuition up to date", "Consistent attendance"]
        },
        2: {
            "name": "High Performers",
            "description": "Students who excel academically and are highly engaged. They have excellent grades, credit approvals, and show no signs of financial or academic stress.",
            "traits": ["High grades", "All credits approved", "Scholarship holders"]
        }
    }
    return jsonify(cluster_info)



if __name__ == "__main__":
    app.run(debug=True, port=5000)