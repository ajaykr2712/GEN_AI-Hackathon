# The Process flow of the project is here by shown and the critical steps being followed while deploying the project...


graph TD
    A[Load Dataset] --> B[Preprocess Data]
    B --> C[Split Data into Training and Testing Sets]
    C --> D[Build Generative Model]
    D --> E[Train the Model]
    E --> F[Generate Personalized Recommendations]
    F --> G[Evaluate the Model]

    A -->|Import CSV| A1[Raw Patient Data]
    B -->|Handle Missing Values, Encode, Normalize| B1[Cleaned and Preprocessed Data]
    C -->|Train-Test Split| C1[Training Data]
    C -->|Train-Test Split| C2[Testing Data]

    G -->|Synthetic Data Generation| H[Generate Synthetic Data]
    H -->|Validate Data| I[Validation under Different Therapy Settings]
    I -->|Integrate Data| J[Simulation Environment Integration]
