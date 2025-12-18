#!/bin/bash

# Quick Gmail Setup Script for Portfolio Contact Form

echo "📧 Gmail Contact Form Setup"
echo "============================="
echo ""
echo "This script will help you set up Gmail for your contact form."
echo ""
echo "⚠️  You need a Gmail App Password first!"
echo "Get it from: https://myaccount.google.com/apppasswords"
echo ""
read -p "Do you have your Gmail App Password ready? (y/n): " ready

if [ "$ready" != "y" ]; then
    echo ""
    echo "📝 Steps to get your App Password:"
    echo "1. Go to https://myaccount.google.com/security"
    echo "2. Enable 2-Step Verification (if not enabled)"
    echo "3. Go to https://myaccount.google.com/apppasswords"
    echo "4. Create an app password for 'Portfolio Contact Form'"
    echo "5. Copy the 16-character password (remove spaces)"
    echo ""
    echo "Run this script again when you have it!"
    exit 0
fi

echo ""
echo "Enter your Gmail App Password (16 characters, no spaces):"
read -s app_password

if [ ${#app_password} -ne 16 ]; then
    echo ""
    echo "❌ Error: App Password should be exactly 16 characters (without spaces)"
    echo "Example: abcdefghijklmnop"
    exit 1
fi

echo ""
echo "Creating .env.local file..."

cat > .env.local << EOF
# Gmail Configuration for Contact Form
GMAIL_USER=ayush.kashyap7155@gmail.com
GMAIL_APP_PASSWORD=$app_password
EOF

echo ""
echo "✅ Success! Your .env.local file has been created."
echo ""
echo "🔄 The development server will automatically restart."
echo ""
echo "✨ Your contact form is now ready!"
echo ""
echo "📧 Emails will be sent to: ayush.kashyap7155@gmail.com"
echo ""
echo "🧪 Test it at: http://localhost:3000/#contact"
echo ""
echo "🔒 Security: Your App Password is stored in .env.local (not in Git)"
echo ""
