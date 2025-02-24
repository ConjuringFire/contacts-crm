<?php

namespace Tests\Unit;

use App\Models\Contact;
use App\Services\ContactService;
use Illuminate\Contracts\Validation\Factory as ValidationFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class ContactServiceTest extends TestCase
{
    use RefreshDatabase;

    protected ContactService $contactService;

    protected function setUp(): void
    {
        parent::setUp();
        $validatorFactory = $this->app->make(ValidationFactory::class);
        $this->contactService = new ContactService($validatorFactory);
    }

    public function test_upsert_contact_create_success(): void
    {
        $data = [
            'name' => 'Test Contact',
            'phone' => '+61412345678',
            'email' => 'test@example.com',
        ];

        $contact = $this->contactService->upsert($data);

        $this->assertInstanceOf(Contact::class, $contact);
        $this->assertDatabaseHas('contacts', $data);
    }

    public function test_upsert_contact_create_validation_failure(): void
    {
        $this->expectException(ValidationException::class);

        $data = [
            'name' => '',
            'phone' => 'invalid',
            'email' => 'invalid',
        ];

        $this->contactService->upsert($data);
    }

    public function test_upsert_contact_update_success(): void
    {
        // Create an existing contact
        $existingContact = Contact::factory()->create([
            'name' => 'Original Name',
            'phone' => '+61551234567',
            'email' => 'original@example.com',
        ]);

        // Data for the update
        $updateData = [
            'name' => 'Updated Name',
            'phone' => '+61559876543',
            'email' => 'updated@example.com',
        ];

        // Call the upsert method with the existing contact's ID
        $updatedContact = $this->contactService->upsert($updateData, $existingContact->id);

        // Assertions
        $this->assertInstanceOf(Contact::class, $updatedContact);
        $this->assertEquals($existingContact->id, $updatedContact->id); // Ensure it's the same contact
        $this->assertEquals('Updated Name', $updatedContact->name);
        $this->assertEquals('+61559876543', $updatedContact->phone);
        $this->assertEquals('updated@example.com', $updatedContact->email);

        // Verify the database update
        $this->assertDatabaseHas('contacts', [
            'id' => $existingContact->id,
            'name' => 'Updated Name',
            'phone' => '+61559876543',
            'email' => 'updated@example.com',
        ]);

        // Verify that only one contact with that id exists.
        $this->assertDatabaseCount('contacts', 1);
    }

    public function test_upsert_contact_update_validation_failure(): void
    {
        // Create an existing contact
        $existingContact = Contact::factory()->create();

        // Data for the update with an invalid email
        $updateData = [
            'name' => 'Updated Name',
            'phone' => '+15559876543',
            'email' => 'invalid-email', // Invalid email format
        ];

        // Expect a ValidationException
        $this->expectException(ValidationException::class);

        // Call the upsert method with the invalid data
        $this->contactService->upsert($updateData, $existingContact->id);

        // Optionally, you can assert that the database was not modified
        $this->assertDatabaseHas('contacts', [
            'id' => $existingContact->id,
            'name' => $existingContact->name, // Original name
            'phone' => $existingContact->phone, // Original phone
            'email' => $existingContact->email, // Original email
        ]);
    }

    public function test_get_contact_success(): void
    {
        $contact = Contact::factory()->create();

        $foundContact = $this->contactService->getContact($contact->id);

        $this->assertInstanceOf(Contact::class, $foundContact);
        $this->assertEquals($contact->id, $foundContact->id);
    }

    public function test_get_contact_not_found(): void
    {
        $foundContact = $this->contactService->getContact(999);

        $this->assertNull($foundContact);
    }

    public function test_delete_contact_success(): void
    {
        $contact = Contact::factory()->create();

        $result = $this->contactService->deleteContact($contact->id);

        $this->assertTrue($result);
        $this->assertSoftDeleted($contact);
    }

    public function test_delete_contact_not_found(): void
    {
        $result = $this->contactService->deleteContact(999);

        $this->assertFalse($result);
    }

    public function test_search_contacts(): void
    {
        Contact::factory()->create(['name' => 'John Doe']);
        Contact::factory()->create(['name' => 'Jane Smith']);

        $results = $this->contactService->searchContacts('John');

        $this->assertCount(1, $results);
        $this->assertEquals('John Doe', $results->first()->name);
    }

    public function test_get_all_contacts(): void
    {
        Contact::factory()->count(3)->create();

        $results = $this->contactService->getAllContacts();

        $this->assertCount(3, $results);
    }

    public function test_call_contact_success(): void
    {
        $contact = Contact::factory()->create();

        $result = $this->contactService->callContact($contact->id);

        $this->assertArrayHasKey('status', $result);
        $this->assertArrayHasKey('message', $result);
    }

    public function test_call_contact_not_found(): void
    {
        $result = $this->contactService->callContact(999);

        $this->assertEquals(['status' => 'error', 'message' => 'Contact not found.'], $result);
    }
}