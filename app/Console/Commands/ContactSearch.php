<?php

namespace App\Console\Commands;

use App\Services\ContactService;
use Illuminate\Console\Command;

class ContactSearch extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:search {term}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Search for a contact';

    protected ContactService $contactService;

    public function __construct(ContactService $contactService)
    {
        parent::__construct();
        $this->contactService = $contactService;
    }

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $term = $this->argument('term');
        $contacts = $this->contactService->searchContacts($term);

        if (!$contacts) {
            $this->error("No contacts found for term: $term");
            return 1;
        }

        $this->info("Contacts found for term: $term");

        foreach ($contacts as $contact) {
            $this->line("ID: {$contact->id}, Name: {$contact->name}, Phone: {$contact->phone}, Email: {$contact->email}");
        }

        return 0;
    }
}