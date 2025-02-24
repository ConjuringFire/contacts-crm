<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Services\ContactService;


class ContactController extends Controller
{
    protected ContactService $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }

    public function upsert(Request $request): JsonResponse
    {
        try {
            $contact = $this->contactService->upsert($request->all(), $request->id);
            return response()->json($contact);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function show(int $id): JsonResponse
    {
        $contact = $this->contactService->getContact($id);

        if (!$contact) {
            return response()->json(['error' => 'Contact not found'], 404);
        }

        return response()->json($contact);
    }

    public function destroy(int $id): JsonResponse
    {
        if ($this->contactService->deleteContact($id)) {
            return response()->json(['message' => 'Contact deleted']);
        }

        return response()->json(['error' => 'Contact not found'], 404);
    }

    // todo: fix search contacts method
    /*public function search(Request $request): JsonResponse
    {
        $term = $request->input('term');
        $results = $this->contactService->searchContacts($term);

        return response()->json($results);
    }*/

    public function index(): JsonResponse
    {
        $contacts = $this->contactService->getAllContacts();
        return response()->json($contacts);
    }

    public function call(int $id): JsonResponse
    {
        $result = $this->contactService->callContact($id);
        return response()->json($result);
    }
}