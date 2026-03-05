Cloudflare Backend Architecture Plan
This document outlines the step-by-step process of building your Serverless Backend using Cloudflare Workers.

Because we have two completely different goals (1. Processing Payments instantly, and 2. Caching data every 30 minutes to save bandwidth), we are going to build two separate, small Cloudflare scripts (Workers).

User Review Required
NOTE

Please review this plan. We will be using the Wrangler CLI (Cloudflare's official tool) to create and deploy these workers directly from your command line. You will need a free Cloudflare account if you don't already have one.

1. The Paystack Webhook Worker (The "Bouncer")
Goal: When a student successfully pays via MoMo, Paystack secretly sends a message (webhook) to this Cloudflare Worker. The worker verifies it's really from Paystack, finds the matching PENDING ad in Supabase, and turns it ACTIVE.

Steps to Implement:

Initialize Worker: Run npm create cloudflare@latest to generate a new boilerplate worker folder (e.g., paystack-webhook).
Add Environment Variables: Add SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (the super-secret admin key), and PAYSTACK_SECRET_KEY to the worker's environment secrets.
Write the Logic:
Listen for HTTP POST requests from Paystack.
Verify the Paystack cryptographic signature to prevent fake payments.
Extract the paystack_reference from the JSON payload.
Use the Supabase Service Role Key to update the advertisements table: SET status = 'ACTIVE', expires_at = NOW() + 7 days WHERE paystack_reference = the_reference.
Deploy: Run npm run deploy. We will give the generated Cloudflare URL to Paystack.
2. The 30-Minute Cache Worker (The "Sanity Saver")
Goal: Prevent thousands of students from querying your Supabase database directly. This worker will wake up every 30 minutes, download the active ads from Supabase, and save them to a hyper-fast Cloudflare KV store.

Steps to Implement:

Create KV Namespace: Use the Cloudflare dashboard or CLI to create a new KV database (e.g., CAMPUS_GUIDE_CACHE).
Initialize Worker: Generate a second worker folder (e.g., community-feed-cache).
Write the Cron Job Logic:
Instead of listening for HTTP requests, we tell this worker to trigger on a cron schedule (e.g., */30 * * * * for every 30 minutes).
When triggered, it queries Supabase for all ACTIVE ads and all announcements.
It formats the JSON and saves it into the CAMPUS_GUIDE_CACHE KV namespace.
Write the Fetch API Logic:
We will add a small HTTP route to this same worker.
When your React app 
Community.jsx
 calls this route, the worker simply reads the JSON from the KV namespace and sends it back instantly.
Deploy & Update React: Deploy the worker, get its URL, and change 
Community.jsx
 to fetch from https://your-new-worker.workers.dev/feed instead of calling supabase.from().
Verification Plan
Automated/Manual Verification
We will simulate a Paystack JSON webhook payload and send it to Worker #1 to see if the database row changes from PENDING to ACTIVE.
We will manually trigger Worker #2 and verify that data is successfully saved to the KV store.
We will load 
Community.jsx
 and ensure the Network tab shows data arriving from Cloudflare, not Supabase.