<?php
namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class JobController extends Controller
{
    public function index()
    {
        return response()->json(Job::all());
    }

    public function show($id)
    {
        $job = Job::findOrFail($id);
        return response()->json($job);
    }

    public function destroy($id)
    {
        $job = Job::findOrFail($id);
        $job->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }

    public function store(Request $request)
    {
        Log::info('Job creation request:', $request->all());

        try {
            $data = $request->validate([
                'title'         => 'required|string|max:255',
                'description'   => 'required|string',
                'contact_email' => 'required|email|max:255',
                'location'      => 'required|string|max:255',
                'is_remote'     => 'required|boolean',
                'tags'          => 'required|array|min:1',
                'tags.*'        => 'string|max:50',
            ]);

            Log::info('Validated data:', $data);

            $job = Job::create($data);

            return response()->json([
                'message' => 'Job created successfully',
                'job' => $job
            ], 201);

        } catch (ValidationException $e) {
            Log::error('Validation error:', $e->errors());
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Job creation error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'message' => $e->getMessage(),
                'error' => $e->getMessage(),
                'details' => config('app.debug') ? $e->getTraceAsString() : null
            ], 500);
        }

    }

}
