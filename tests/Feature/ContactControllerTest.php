<?php

namespace Tests\Feature;

use App\Models\Contact;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_upsert_contact(): void
    {
        $data = [
            'name' => 'Test Contact',
            'phone' => '+61412345678',
            'email' => 'test@example.com',
        ];

        $response = $this->postJson('/api/contacts', $data);

        $response->assertStatus(200)
            ->assertJson($data);

        $this->assertDatabaseHas('contacts', $data);
    }

    public function test_get_contact(): void
    {
        $contact = Contact::factory()->create();

        $response = $this->getJson("/api/contacts/{$contact->id}");

        $response->assertStatus(200)
            ->assertJson($contact->toArray());
    }

    public function test_delete_contact(): void
    {
        $contact = Contact::factory()->create();

        $response = $this->deleteJson("/api/contacts/{$contact->id}");

        $response->assertStatus(200);
        $this->assertSoftDeleted($contact);
    }

    // TODO: fix search contacts method
    /*public function test_search_contacts(): void
    {
        Contact::factory()->create(['name' => 'John Doe']);
        Contact::factory()->create(['name' => 'Jane Smith']);

        $response = $this->getJson('/api/contacts/search?term=John');

        $response->assertStatus(200)
            ->assertJsonCount(1)
            ->assertJsonPath('0.name', 'John Doe');
    }*/

    public function test_get_all_contacts(): void
    {
        Contact::factory()->count(3)->create();

        $response = $this->getJson('/api/contacts');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_call_contact(): void
    {
        $contact = Contact::factory()->create();

        $response = $this->postJson("/api/contacts/{$contact->id}/call");

        $response->assertStatus(200)
            ->assertJsonStructure(['status', 'message']);
    }
}