#!/usr/bin/env node

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucketName = process.env.SUPABASE_BUCKET || 'church-media';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function setupBucket() {
  console.log(`🔍 Checking if bucket "${bucketName}" exists...`);

  // Check if bucket exists
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  
  if (listError) {
    console.error('❌ Error listing buckets:', listError.message);
    process.exit(1);
  }

  const bucketExists = buckets.some(b => b.name === bucketName);

  if (bucketExists) {
    console.log(`✅ Bucket "${bucketName}" already exists`);
    
    // List files in bucket
    const { data: files, error: filesError } = await supabase.storage.from(bucketName).list('uploads');
    if (!filesError && files) {
      console.log(`📁 Found ${files.length} files in uploads folder`);
    }
  } else {
    console.log(`📦 Creating bucket "${bucketName}"...`);
    
    const { data, error } = await supabase.storage.createBucket(bucketName, {
      public: true,
      fileSizeLimit: 1048576, // 1MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
    });

    if (error) {
      console.error('❌ Error creating bucket:', error.message);
      process.exit(1);
    }

    console.log(`✅ Bucket "${bucketName}" created successfully`);
  }

  console.log('\n✨ Setup complete! You can now upload images.');
}

setupBucket().catch(console.error);
