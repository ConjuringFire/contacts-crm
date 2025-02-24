<?php

namespace App\Services;

use App\Models\Contact;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\Validator as ValidationValidator;

class ContactService
{
    public function upsert(array $data, ?int $id = null): Contact
    {
        $this->validate($data, Contact::rules())->validate();

        return Contact::updateOrCreate(['id' => $id], $data);
    }

    private function validate(array $data, array $rules): ValidationValidator
    {
        return Validator::make($data, $rules);
    }

    public function getContact(int $id): ?Contact
    {
        return Contact::find($id);
    }

    public function deleteContact(int $id): bool
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return false;
        }

        return $contact->delete();
    }

    public function searchContacts(string $term): Collection
    {
        return Contact::search($term)->get();
    }

    public function getAllContacts(): Collection
    {
        return Contact::all();
    }

    public function callContact(int $id): array
    {
        $contact = $this->getContact($id);

        if (!$contact) {
            return ['status' => 'error', 'message' => 'Contact not found.'];
        }

        if (rand(0, 1)) {
            return ['status' => 'success', 'message' => 'Call placed successfully.'];
        } else {
            return ['status' => 'error', 'message' => 'Call failed.'];
        }
    }
}