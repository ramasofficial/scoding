<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use GuzzleHttp\Exception\BadResponseException;

class LoginService {

    public function login(Request $request)
    {
        $http = new Client;

        try {
            $response = $http->post(config('services.passport.login_endpoint'), [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => config('services.passport.client_id'),
                    'client_secret' => config('services.passport.client_secret'),
                    'username' => $request->username,
                    'password' => $request->password,
                ]
            ]);

            return $response->getBody();
        } catch (BadResponseException $e) {
            if ($e->getCode() === 400) {
                return response()->json('Invalid Request. Please enter a correct username or password.', $e->getCode());
            } else if ($e->getCode() === 401) {
                return response()->json('Your credentials are incorrect. Please try again.', $e->getCode());
            }

            return response()->json('Something went wrong on the server.', $e->getCode());
        }
    }

}
