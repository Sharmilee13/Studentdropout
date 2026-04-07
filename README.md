# Student Dropout Prediction Project

This project is a Machine Learning web application designed to predict and analyze the academic outcomes of students, specifically determining whether a student is at risk of dropping out, will remain enrolled, or is likely to graduate.

Below is a detailed overview of the core project objectives and how they are currently implemented.

---

## Objective 1: Predictive Modeling (Supervised Learning)
**Goal:** To predict a student's final academic outcome based on their demographic, socio-economic, and academic profiles.
**Implementation:** 
- The project implements **six supervised classification models**: Logistic Regression, Random Forest, Balanced Random Forest, Decision Tree, XGBoost, and LightGBM.
- The Flask backend exposes a `/predict` API route where frontend inputs (36 student attributes) are passed into a selected model.
- The model outputs whether the student is predicted as **"Dropout Risk"**, **"Enrolled"**, or **"Graduate"**, alongside a **Confidence Score** representing the probability of that prediction.

## Objective 2: Student Profiling & Risk Clustering (Unsupervised Learning)
**Goal:** To provide explainability by determining which student attributes influence predictions most strongly at a cohort level.
**Implementation:**
- The Flask backend exposes `/importance`, which uses the trained **Random Forest** model’s `feature_importances_` to compute the top drivers.
- The frontend consumes this list and visualizes it as “Underlying drivers” (donut + ranking + bars), tagging finance-related signals.

## Objective 3: Model Evaluation and Comparison
**Goal:** To track, evaluate, and compare how well each machine learning algorithm is performing to choose the best one.
**Implementation:** 
- A dedicated `/metrics` API route computes the performance of all loaded models against a test dataset.
- For supervised classification, it calculates and returns **Accuracy, Precision, Recall, and F1-Score**.
- For the unsupervised K-Means model, it computes the **Silhouette Score** and **Inertia**.
- This data is then sent to the frontend to visually compare models on a metrics board.

## Objective 4: Feature Importance (Identify Key Dropout Factors)
**Goal:** To provide an interactive “decision support” style assistant panel for counselors using the analyzed student profile.
**Implementation:**
- Implemented as a **rule-based UI chatbot** in the Next.js frontend (no LLM call).
- It uses a few key fields (e.g., debtor / tuition flags / Semester‑1 grade) plus the computed risk score to respond with intervention suggestions and factor explanations.

## Objective 5: Full-Stack Integration & API Architecture
**Goal:** To integrate the machine learning logic into an accessible format through a REST API.
**Implementation:** 
- Built with **Python and Flask**. 
- The backend loads pre-trained models via `.pkl` (pickle) files into memory upon startup.
- It handles complex data pipelines, maps the correct column headers, formats the payload using pandas DataFrames, cleans empty variables, and wraps model predictions into standard JSON objects.

## Objective 6: Interactive Dashboard Output
**Goal:** To group students into clusters based purely on their behaviors and backgrounds (unsupervised) and surface “silent dropout” patterns.
**Implementation:**
- Uses **K-Means** (`models/kmeans.pkl`) via the shared `/predict` route when `model = "kmeans"`.
- The `/cluster-info` endpoint returns cluster personas (0–2), which the frontend renders in Objective 6 (“Silent / behavior”).
