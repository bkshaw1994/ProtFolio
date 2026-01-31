#!/bin/bash
# SEO Validation Script
# Tests all SEO-related endpoints and meta tags

echo "🔍 SEO & Indexing Validation"
echo "=============================="
echo ""

SERVER_URL="http://localhost:3001"
PRODUCTION_URL="https://bishal-portfolio-chi.vercel.app"

# Choose which URL to test
URL="${1:-$SERVER_URL}"

echo "Testing URL: $URL"
echo ""

# Test 1: robots.txt
echo "1. Testing robots.txt..."
curl -s "$URL/robots.txt" > /tmp/robots.txt
if grep -q "User-agent: \*" /tmp/robots.txt && grep -q "Sitemap:" /tmp/robots.txt; then
  echo "   ✅ robots.txt is valid"
else
  echo "   ❌ robots.txt has issues"
fi
echo ""

# Test 2: sitemap.xml
echo "2. Testing sitemap.xml..."
curl -s "$URL/sitemap.xml" > /tmp/sitemap.xml
if grep -q "<urlset" /tmp/sitemap.xml && grep -q "<loc>" /tmp/sitemap.xml; then
  echo "   ✅ sitemap.xml is valid"
  PAGE_COUNT=$(grep -c "<url>" /tmp/sitemap.xml)
  echo "   📄 Pages in sitemap: $PAGE_COUNT"
else
  echo "   ❌ sitemap.xml has issues"
fi
echo ""

# Test 3: HTTP Status Codes
echo "3. Testing HTTP Status Codes..."
PAGES=("/" "/about" "/projects" "/skills" "/experience" "/contact")
for page in "${PAGES[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL$page")
  if [ "$STATUS" = "200" ]; then
    echo "   ✅ $page returns $STATUS"
  else
    echo "   ❌ $page returns $STATUS (expected 200)"
  fi
done
echo ""

# Test 4: Meta Tags
echo "4. Testing Meta Tags (homepage)..."
curl -s "$URL/" > /tmp/homepage.html

if grep -q 'name="robots"' /tmp/homepage.html; then
  echo "   ✅ robots meta tag found"
else
  echo "   ❌ robots meta tag missing"
fi

if grep -q 'name="description"' /tmp/homepage.html; then
  echo "   ✅ description meta tag found"
else
  echo "   ❌ description meta tag missing"
fi

if grep -q 'property="og:title"' /tmp/homepage.html; then
  echo "   ✅ Open Graph tags found"
else
  echo "   ❌ Open Graph tags missing"
fi

if grep -q 'rel="canonical"' /tmp/homepage.html; then
  echo "   ✅ Canonical URL found"
else
  echo "   ❌ Canonical URL missing"
fi
echo ""

# Test 5: Structured Data
echo "5. Testing Structured Data..."
if grep -q 'application/ld+json' /tmp/homepage.html; then
  echo "   ✅ JSON-LD structured data found"
  SCHEMA_COUNT=$(grep -c '@type' /tmp/homepage.html)
  echo "   📊 Schema types found: $SCHEMA_COUNT"

  if grep -q '"@type": "Person"' /tmp/homepage.html; then
    echo "   ✅ Person schema found"
  fi

  if grep -q '"@type": "WebSite"' /tmp/homepage.html; then
    echo "   ✅ WebSite schema found"
  fi

  if grep -q '"@type": "BreadcrumbList"' /tmp/homepage.html; then
    echo "   ✅ BreadcrumbList schema found"
  fi
else
  echo "   ❌ Structured data missing"
fi
echo ""

# Test 6: HTML Validation
echo "6. Testing HTML Structure..."
BODY_COUNT=$(grep -c '<body>' /tmp/homepage.html)
if [ "$BODY_COUNT" = "1" ]; then
  echo "   ✅ Single <body> tag (no duplicates)"
else
  echo "   ❌ Multiple <body> tags found: $BODY_COUNT"
fi

if grep -q '<!DOCTYPE html>' /tmp/homepage.html; then
  echo "   ✅ Valid DOCTYPE"
else
  echo "   ❌ DOCTYPE missing"
fi
echo ""

# Summary
echo "=============================="
echo "Validation Complete!"
echo ""
echo "Next Steps:"
echo "1. Deploy to Vercel: git push origin main"
echo "2. Test production: ./validate-seo.sh $PRODUCTION_URL"
echo "3. Submit sitemap in Google Search Console"
echo "4. Request indexing for all pages"
echo ""
echo "Resources:"
echo "- Rich Results Test: https://search.google.com/test/rich-results"
echo "- Schema Validator: https://validator.schema.org/"
echo "- PageSpeed Insights: https://pagespeed.web.dev/"
echo ""
