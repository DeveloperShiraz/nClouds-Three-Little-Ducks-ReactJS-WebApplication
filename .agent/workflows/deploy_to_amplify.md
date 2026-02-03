---
description: How to deploy the nClouds Three Little Ducks app to AWS Amplify Hosting
---

# Deploying to AWS Amplify Hosting

The user wants to deploy the application to the cloud to avoid local sandbox issues. This involves pushing the code to a Git repository (likely GitHub) and connecting it to the AWS Amplify Console.

## Prerequisites
- [x] Project initialized and running locally
- [ ] Git repository initialized
- [ ] Code committed
- [ ] GitHub repository created

## Steps

1.  **Initialize Git (if not already done)**
    ```bash
    git init
    git add .
    git commit -m "Initial commit - Ready for deployment"
    ```

2.  **Create GitHub Repository**
    - User needs to go to [github.com/new](https://github.com/new)
    - Create a repo named `nclouds-three-little-ducks`
    - Copy the remote URL (e.g., `https://github.com/Startups-nClouds/nClouds-Three-Little-Ducks-ReactJS-WebApplication.git`)

3.  **Push Code**
    ```bash
    git remote add origin <your-repo-url>
    git branch -M main
    git push -u origin main
    ```

4.  **Connect to Amplify Console**
    - Go to AWS Console > **AWS Amplify**
    - Open your app (you might see the sandbox app there, or create a new one "Host web app")
    - Choose **GitHub** as the source
    - Select the repository and `main` branch
    - **IMPORTANT:** Under **Environment variables**, add:
        - `BEDROCK_KB_ID`: `EDVQVYY0CQ`
        - `BEDROCK_MODEL_ID`: `amazon.nova-lite-v1:0` (Use the working v1 model for safety)
    - Click **Save and Deploy**

5.  **Verify**
    - Wait for the build to complete
    - Visit the provided URL (e.g., `https://main.d12345.amplifyapp.com`)
    - Test the Chatbot functionality
