<?php
header('Content-Type: application/json');

// Fetch random dog image from The Dog API
$dogApiUrl = 'https://dog.ceo/api/breeds/image/random';
$dogApiResponse = file_get_contents($dogApiUrl);
if (!$dogApiResponse) {
    echo json_encode(['error' => 'Failed to fetch dog image.']);
    exit;
}
$dogData = json_decode($dogApiResponse, true);
$imageUrl = $dogData['message'];
$breed = ucwords(str_replace('-', ' ', explode('/', parse_url($imageUrl)['path'])[2]));

// Fetch breed description from Wikipedia API
$wikiApiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/' . urlencode($breed);
$wikiApiResponse = file_get_contents($wikiApiUrl);
if (!$wikiApiResponse) {
    echo json_encode(['error' => 'Failed to fetch breed description.']);
    exit;
}
$wikiData = json_decode($wikiApiResponse, true);

// Construct and return JSON response
$response = [
    'breed' => $breed,
    'image' => $imageUrl,
    'description' => $wikiData['extract'] ?? 'Description not available.',
    'fetched_at' => date('Y-m-d H:i:s')
];
echo json_encode($response);
?>