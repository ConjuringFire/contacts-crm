<?php

namespace App\Console\Commands;

use App\Services\ContactService;
use Illuminate\Console\Command;

class ContactDelete extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:delete {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete a contact by ID';

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
        $id = (int) $this->argument('id');

        try {
            $this->contactService->deleteContact($id);
            $this->info("Contact with ID $id deleted successfully.");
            return 0;
        } catch (\Exception $e) {
            $this->error("Failed to delete contact: " . $e->getMessage());
            return 1;
        }

        return 0;
    }
}