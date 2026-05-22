<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Planning;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PlanningController extends Controller
{
    public function index()
    {
        return response()->json(Planning::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|in:child,adult',
            'image' => 'required|image'
        ]);

        $path = $request->file('image')->store('plannings', 'public');

        $planning = Planning::where('category', $request->category)->first();

        if ($planning) {
            // delete old image
            if ($planning->image && Storage::disk('public')->exists($planning->image)) {
                Storage::disk('public')->delete($planning->image);
            }

            $planning->update(['image' => $path]);
        } else {
            $planning = Planning::create([
                'category' => $request->category,
                'type' => 'full_day',
                'image' => $path
            ]);
        }

        return response()->json($planning);
    }

    public function destroy($id)
    {
        $planning = Planning::findOrFail($id);

        if ($planning->image && Storage::disk('public')->exists($planning->image)) {
            Storage::disk('public')->delete($planning->image);
        }

        $planning->delete();

        return response()->json([
            'message' => 'Planning deleted successfully'
        ]);
    }
}
