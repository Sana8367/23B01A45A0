# Stage 1

## Notification APIs

### Get Notifications

GET /api/notifications

Headers:

Authorization: Bearer <token>

Response:

{
"success": true,
"notifications": []
}

---

### Mark Notification Read

PUT /api/notifications/:id/read

Headers:

Authorization: Bearer <token>

Response:

{
"success": true,
"message": "Notification marked as read"
}

---

### Delete Notification

DELETE /api/notifications/:id

Headers:

Authorization: Bearer <token>

Response:

{
"success": true
}

---

### Create Notification

POST /api/notifications

Request:

{
"type": "Placement",
"message": "Amazon Hiring"
}

Response:

{
"success": true
}

---

## Real-Time Notifications

Use WebSockets (Socket.IO).

Flow:

1. User logs in
2. Socket connection established
3. Server pushes notification instantly
4. Client updates UI without refresh

# Stage 2

## Database Choice

PostgreSQL

Reasons:

* ACID compliant
* Reliable
* Supports indexing
* Handles relationships efficiently

## Tables

Students

student_id
name
email

Notifications

notification_id
student_id
notification_type
message
is_read
created_at

## Scaling Problems

* Large table scans
* Slow sorting
* High read traffic

Solutions

* Indexing
* Pagination
* Caching
* Read replicas

Example Query

SELECT *
FROM notifications
WHERE student_id = 1042
ORDER BY created_at DESC;

# Stage 3

Original Query:

SELECT *
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt DESC;

Issues:

* Full table scan if indexes missing
* Sorting millions of rows

Recommended Index:

CREATE INDEX idx_notifications_student_read_created
ON notifications(studentID, isRead, createdAt DESC);

Complexity

Without Index:
O(n)

With Index:
O(log n)

Adding indexes to every column is not recommended because:

* Increases storage
* Slows inserts
* Slows updates

Placement Notification Query:

SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 days';


# Stage 4

Performance Improvements

1. Redis Cache

Pros:

* Fast reads

Cons:

* Extra infrastructure

2. Pagination

Pros:

* Less DB load

Cons:

* More API calls

3. WebSockets

Pros:

* Real-time updates

Cons:

* Connection management

4. Read Replicas

Pros:

* Offload reads

Cons:

* Additional cost


# Stage 5

Problems

* Sequential processing
* Slow
* Failure midway causes inconsistency

Better Architecture

HR
↓
Notification Service
↓
Message Queue (RabbitMQ/Kafka)
↓
Workers
├── Email Worker
├── DB Worker
└── Push Worker

Benefits

* Retry support
* Parallel processing
* Fault tolerance

Pseudo Code

enqueue(notification)

worker:

save_to_db()

send_email()

push_notification()

if failed:
retry()

# Stage 6

Priority is calculated using:

Priority Score =
(Notification Weight × Large Constant)
+ Timestamp

Weights:

Placement = 3
Result = 2
Event = 1

Notifications are sorted in descending order of score.

Top 10 notifications are displayed.

For continuous incoming notifications, a Min Heap of size 10 can be maintained.

Time Complexity:

Sorting Approach:
O(n log n)

Heap Approach:
O(n log 10)
≈ O(n)

Space Complexity:
O(10)