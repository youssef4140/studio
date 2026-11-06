# Publishing pages with your AI: quick guide

Give your AI (ChatGPT or Claude) a short setup file once. After that you hand it page content and it creates, edits and publishes the page for you. No copy-pasting JSON.

## 1. Get a setup file (an admin does this, once per team)

1. In the Studio admin, open **Import keys**.
2. Click **New key and guide**.
3. Fill in:
   - **Name**: who it's for, e.g. "PTOC programs team".
   - **Tenant** and **Folders**: tick the folder(s) the team may publish to (e.g. *Programs*). The key works **only** in the folders you tick.
   - **Expires after**: 90 days is the default.
   - **Can delete pages**: leave off unless the team really needs it.
4. Click **Create key and guide**, then **Download .md** (or Copy). **You can't see the key again after closing**, so do this now.
5. Send the file to the team privately. Treat it like a password.

## 2. Use it (content team)

1. Give the `.md` file to your AI and say what you want. Examples:
   - "Make a program page for *Pelvic Floor Therapy* from this content: …"
   - "On the *lymphedema-treatment* page, change the hero heading to … and add this image."
   - "Unpublish the *sports-rehabilitation* page."
2. The AI does the work and replies with a link to the page, plus the **slug** it used.
3. Open the link and check the page. To fix something, just ask the AI.

The AI is told to fill in every field it can from your content (not only the required ones). If a section looks bare, tell it which part is missing and what should go there.

Pages are **published straight away**. If you'd rather review first, say "save it as a draft".

## 3. The slug (important)

- The slug is made from the page **title**: lowercase, words joined by dashes. "Pelvic Floor Therapy" → `pelvic-floor-therapy`.
- The AI will tell you the slug after it creates a page. **That slug must match the `cms_slug` of the page in its dashboard.** If it doesn't, the page won't be found on the site. Check it every time.
- Want a different slug? Tell the AI up front and it will use yours exactly.
- Using the same slug in the same folder again **replaces** that page's content.

## 4. Looking after keys

- **Switch a key off now:** open it in **Import keys** and set **Revoked at**.
- **Expired or lost:** make a new key and send the new file. Old keys can't be renewed.
- **Who used it last:** shown as **Last used** on the key.
- You only see the keys you created (superadmins see all).

## If something goes wrong

| What the AI says | What it means |
|---|---|
| 401 / "key not valid" or "expired" | Ask an admin for a new key. |
| 403 | The page is in a folder this key doesn't cover. |
| 404 | No page with that slug in that folder. |
| 422 / a list of errors | The content didn't fit a component. The AI should fix and retry. |
| 429 | Too many requests; wait a minute. |
