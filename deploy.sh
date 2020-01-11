gcloud builds submit --tag gcr.io/cloudrun-test-259012/thumbnail
gcloud run deploy --image gcr.io/cloudrun-test-259012/thumbnail --platform managed --memory 2Gi
