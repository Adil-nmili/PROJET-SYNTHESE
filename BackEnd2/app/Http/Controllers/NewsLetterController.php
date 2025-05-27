<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NewsLetterController extends Controller
{
    public function subscribe(Request $request)
{

    $email = $request[0];
 
    if (!$email) {
        return response()->json(['error' => 'Email is required'], 422);
    }

    $apiKey = config('services.mailchimp.key');
    $listId = config('services.mailchimp.list_id');
    $dc = substr($apiKey, strpos($apiKey, '-') + 1);

    $response = Http::withBasicAuth('anystring', $apiKey)
        ->post("https://$dc.api.mailchimp.com/3.0/lists/$listId/members", [
            'email_address' => $email,
            'status' => 'subscribed'
        ]);

    // Log the full response for debugging
    Log::info('Mailchimp response', ['body' => $response->body(), 'status' => $response->status()]);

    if ($response->successful()) {
        return response()->json(['message' => 'Subscribed'],200);
    } else {
        return response()->json([
            'error' => 'Failed to subscribe',
            'mailchimp_response' => $response->json(),
        ], 500);
    }
}
}
