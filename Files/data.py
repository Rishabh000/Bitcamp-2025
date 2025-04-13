import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

BASE_URL = "https://www.cs.umd.edu"
FACULTY_URL = f"{BASE_URL}/people/faculty"
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
}

def get_email_from_profile(profile_url):
    try:
        resp = requests.get(profile_url, headers=HEADERS)
        soup = BeautifulSoup(resp.text, 'html.parser')

        # Priority 1: mailto: links
        mail_tag = soup.find('a', href=lambda href: href and href.startswith('mailto:'))
        if mail_tag:
            return mail_tag['href'].replace("mailto:", "").strip()

        # Priority 2: Email text in class spamspan or field-content
        spam_span = soup.find('a', class_='spamspan')
        if spam_span:
            return spam_span.get_text(strip=True)

        # Priority 3: Any span or div containing @umd.edu
        fallback = soup.find(string=lambda text: text and '@umd.edu' in text)
        if fallback:
            return fallback.strip()

    except Exception as e:
        print(f"[ERROR] Could not fetch email from {profile_url}: {e}")
    return "N/A"

# Step 1: Fetch faculty directory
response = requests.get(FACULTY_URL, headers=HEADERS)
soup = BeautifulSoup(response.text, 'html.parser')

faculty_data = []

for entry in soup.find_all('div', class_='media-body'):
    # Name
    name_tag = entry.find('h4', class_='media-heading')
    name = name_tag.get_text(strip=True) if name_tag else "N/A"

    # Title
    title = 'N/A'
    if name_tag:
        next_node = name_tag.next_sibling
        while next_node and (not hasattr(next_node, 'strip') or not next_node.strip()):
            next_node = next_node.next_sibling
        if next_node:
            title = next_node.strip()

    # Research Areas
    research_links = entry.find_all('a', href=True)
    research_areas = [a.get_text(strip=True) for a in research_links if '/research-area/' in a['href']]
    research = ', '.join(research_areas) if research_areas else "N/A"

    # Profile link and email
    profile_link = name_tag.find('a')['href'] if name_tag and name_tag.find('a') else None
    email = "N/A"

    if profile_link:
        full_profile_url = BASE_URL + profile_link
        email = get_email_from_profile(full_profile_url)
        time.sleep(0.5)

    faculty_data.append({
        "Name": name,
        "Title": title,
        "Research Areas": research,
        "Email": email
    })

# Save to CSV
df = pd.DataFrame(faculty_data)
df.to_csv("umd_cs_faculty_with_emails.csv", index=False)
print("✅ Email scraping complete. Saved to umd_cs_faculty_with_emails.csv")
