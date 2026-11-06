# Deployment and launch checklist

## Customer contact buttons
The customer site has direct-call and WhatsApp links to the shop number (Bahrain country code +973, local number 3721 2318). Confirm the business owns and monitors this number before launch.

## Staff receiving app
Staff sign in with an individually created Supabase Auth email and password. Create accounts in Supabase; do not put shared usernames/passwords in source code or deploy secrets in frontend files. Add only approved staff account user IDs to the protected `staff_members` table and enforce access with database Row Level Security.

The staff app polls for incoming orders while signed in. Browser notifications require HTTPS, notification permission, and the staff app to remain open; they are not a guaranteed background/push delivery system. Keep a second channel such as the shop phone available.

## Deployment blockers that still require the owner
- Create/configure the Supabase project and apply a reviewed orders/staff schema and least-privilege RLS policies.
- Set Netlify `SUPABASE_URL` and `SUPABASE_ANON_KEY` environment values (public key only, never service-role/secret).
- Connect the repository to a Netlify site and deploy its preview.
- Test real staff login, customer order insertion, staff-only access, call/WhatsApp links, and notifications over HTTPS.
- Review menu accuracy, legal terms/privacy text, and business contact/service information.

The app cannot be safely configured or put into production without the owner-controlled Supabase and Netlify accounts and a real staff email/password. Do not send passwords in chat or commit them to Git.
