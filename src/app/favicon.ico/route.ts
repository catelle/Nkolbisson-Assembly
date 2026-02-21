const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#2b7ccc"/>
  <path d="M18 20h28v8H18z" fill="#f2c94c"/>
  <path d="M28 20h8v28h-8z" fill="#f2c94c"/>
</svg>
`;

export function GET() {
  return new Response(svg.trim(), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
