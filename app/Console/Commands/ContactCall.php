<?php

namespace App\Console\Commands;

use App\Services\ContactService;
use Illuminate\Console\Command;

class ContactCall extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:call {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Has a call been placed with a contact by ID';

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
        $callContact = $this->contactService->callContact($id);

        $this->info("Result: {$callContact['status']}");
        $this->info("Message: {$callContact['message']}");

        return 0;
    }
}