<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $data = [
            'stats' => [
                'total' => 30,
                'inReview' => 10,
                'needRevision' => 4,
                'completed' => 16,
            ],
            'assessmentProgress' => [
                'current' => 'Permintaan Penggunaan HCSO',
                'version' => 'v2',
                'status' => 'NEED REVISION',
                'steps' => [
                    ['name' => 'Draft', 'completed' => true],
                    ['name' => 'Submitted', 'completed' => true],
                    ['name' => 'Review', 'completed' => true],
                    ['name' => 'Revision', 'completed' => true, 'current' => true],
                    ['name' => 'DG Council', 'completed' => true],
                    ['name' => 'Completed', 'completed' => false],
                ],
            ],
            'actionRequired' => [
                [
                    'id' => 'GRD-2026-0008',
                    'badge' => 'NEED REVISION',
                    'title' => 'Permintaan Penggunaan HCSO',
                    'time' => '7 days ago',
                ],
                [
                    'id' => 'GRD-2026-0008',
                    'badge' => 'NEED DATA PROVIDER EVIDENCE',
                    'title' => 'Permintaan Penggunaan HCSO',
                    'time' => '7 days ago',
                ],
                [
                    'id' => 'GRD-2026-0008',
                    'badge' => 'NEED DATA PROCESSING APPROVALS',
                    'title' => 'Permintaan Penggunaan HCSO',
                    'time' => '7 days ago',
                ],
            ],
            'recentRequests' => [
                [
                    'threadId' => 'GRD-2026-0008',
                    'title' => 'Permintaan Penggunaan HCSO',
                    'type' => 'Assessment',
                    'version' => 'v2',
                    'status' => 'Need Revision',
                    'lastUpdated' => '7 days ago',
                ],
                [
                    'threadId' => 'GRD-2026-0005',
                    'title' => 'Test Use Case Baru',
                    'type' => 'Assessment',
                    'version' => 'v1',
                    'status' => 'Completed',
                    'lastUpdated' => '10 days ago',
                ],
                [
                    'threadId' => 'GRD-2026-0007',
                    'title' => 'Perubahan Data Target',
                    'type' => 'Reassessment',
                    'version' => 'v2',
                    'status' => 'In Review',
                    'lastUpdated' => '10 days ago',
                ],
            ],
        ];

        return response()->json($data);
    }
}
