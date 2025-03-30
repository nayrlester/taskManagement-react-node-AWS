# Deployment Guide

This guide provides step-by-step instructions to deploy the backend (Node.js + AWS Lambda + API Gateway) and the frontend (React) to AWS.

---

## Backend Deployment (Serverless Framework)

### Prerequisites
1. Install **Node.js** (v18 or later).
2. Install the **Serverless Framework** globally:
   ```bash
   npm install -g serverless
   ```
3. Configure AWS CLI with your credentials:
   ```bash
   aws configure
   ```
   Provide your AWS Access Key, Secret Key, and default region (e.g., `us-east-1`).

### Steps
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Deploy the backend to AWS:
   ```bash
   serverless deploy - to deploy in AWS production
   or
   npm run local - to run locally
   ```
4. After deployment, note the API Gateway endpoints displayed in the terminal.

---

## Frontend Deployment (React + S3)

### Prerequisites
1. Install **Node.js** (v18 or later).
2. Install the **AWS CLI** and configure it with your credentials:
   ```bash
   aws configure
   ```

### Steps
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the React application:
   ```bash
   npm run dev - to run locally
   or
   npm run build - to build for production deployment
   ```
   This will generate a `build` folder containing the production-ready files.
4. Create an S3 bucket to host the frontend:
   ```bash
   aws s3 mb s3://<your-bucket-name>
   ```
5. Enable static website hosting for the S3 bucket:
   ```bash
   aws s3 website s3://<your-bucket-name>/ --index-document index.html --error-document index.html
   ```
6. Upload the `build` folder to the S3 bucket:
   ```bash
   aws s3 sync build/ s3://<your-bucket-name> --acl public-read
   ```
7. Access the frontend via the S3 bucket's website URL:
   - Go to the AWS Management Console.
   - Navigate to **S3** > Your Bucket > **Properties** > **Static Website Hosting**.
   - Copy the **Endpoint URL** and open it in your browser.

---

## Notes

- Ensure the backend API Gateway URL is correctly configured in the frontend environment file (`.env`).

---

# Assumptions

1. The API endpoint provided in the `.env.example` file (`VITE_API_URL`) is correctly configured and accessible for local development.
2. The API requires no additional authentication or authorization headers for development purposes only.