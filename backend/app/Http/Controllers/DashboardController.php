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
            'assessmentProgresses' => [
                [
                    'current' => 'Test Use Case 1',
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
                [
                    'current' => 'Test Use Case 2',
                    'version' => 'v1',
                    'status' => 'COMPLETED',
                    'steps' => [
                        ['name' => 'Draft', 'completed' => true],
                        ['name' => 'Submitted', 'completed' => true],
                        ['name' => 'Review', 'completed' => true],
                        ['name' => 'Revision', 'completed' => true],
                        ['name' => 'DG Council', 'completed' => true],
                        ['name' => 'Completed', 'completed' => true, 'current' => true],
                    ],
                ],
                [
                    'current' => 'Test Use Case 3',
                    'version' => 'v2',
                    'status' => 'IN REVIEW',
                    'steps' => [
                        ['name' => 'Draft', 'completed' => true],
                        ['name' => 'Submitted', 'completed' => true],
                        ['name' => 'Review', 'completed' => true, 'current' => true],
                        ['name' => 'Revision', 'completed' => false],
                        ['name' => 'DG Council', 'completed' => false],
                        ['name' => 'Completed', 'completed' => false],
                    ],
                ],
            ],
            'actionRequired' => [
                [
                    'id' => 'GRD-2026-0008',
                    'badge' => 'NEED REVISION',
                    'title' => 'Test Use Case 1',
                    'time' => '7 days ago',
                ],
                [
                    'id' => 'GRD-2026-0012',
                    'badge' => 'NEED DATA PROVIDER EVIDENCE',
                    'title' => 'Test Use Case 2',
                    'time' => '2 days ago',
                ],
                [
                    'id' => 'GRD-2026-0015',
                    'badge' => 'NEED ADDITIONAL DOCS',
                    'title' => 'Test Use Case 3',
                    'time' => '1 day ago',
                ],
            ],
            'recentRequests' => [
                [
                    'threadId' => 'GRD-2026-0008',
                    'title' => 'Test Use Case 1',
                    'type' => 'Assessment',
                    'version' => 'v2',
                    'status' => 'Need Revision',
                    'lastUpdated' => '7 days ago',
                ],
                [
                    'threadId' => 'GRD-2026-0005',
                    'title' => 'Test Use Case 2',
                    'type' => 'Assessment',
                    'version' => 'v1',
                    'status' => 'Completed',
                    'lastUpdated' => '10 days ago',
                ],
                [
                    'threadId' => 'GRD-2026-0007',
                    'title' => 'Test Use Case 3',
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
