# PLAN.md

# AI-Driven Decentralized Examination System

## Overview

Build a secure, AI-driven examination platform that minimizes human involvement in the examination lifecycle to significantly reduce the possibility of examination paper leaks.

The system follows a zero-trust architecture where no single individual, administrator, or contributor has access to the complete examination paper before the scheduled examination time.

The AI is responsible for:

- Validating submitted questions
- Detecting duplicates
- Mapping syllabus coverage
- Estimating difficulty
- Categorizing cognitive complexity
- Building statistically equivalent examination papers
- Encrypting all examination assets

---

# Goals

Primary objectives:

- Remove humans from examination paper generation.
- Prevent paper leaks.
- Prevent insider attacks.
- Maintain balanced syllabus coverage.
- Produce statistically equivalent examination papers.
- Encrypt every sensitive asset immediately after processing.

---

# High-Level Architecture

```
Professors
      │
      ▼
Question Submission Portal
      │
      ▼
AI Validation Engine
      │
      ├── Duplicate Detection
      ├── Semantic Analysis
      ├── Difficulty Estimation
      ├── Bloom's Taxonomy
      ├── Topic Mapping
      ├── Metadata Extraction
      │
      ▼
Encrypted Question Repository
      │
      ▼
Paper Generation Engine
      │
      ▼
Encrypted Paper Storage
      │
      ▼
Exam Scheduler
      │
      ▼
Secure Decryption
      │
      ▼
Student Examination Portal
```

---

# Functional Requirements

## Professor Portal

The system shall support authenticated professors.

Each professor:

- submits approximately 30 questions
- cannot view other professors
- cannot edit submissions after deadline
- cannot determine whether questions are accepted
- cannot determine whether questions appear in final papers

Each submission includes:

- Question
- Options (if applicable)
- Correct answer
- Explanation
- Subject
- Topic
- Estimated marks
- Question type

---

## AI Validation Engine

Every submitted question must pass through an AI pipeline.

The AI performs:

### Duplicate Detection

Detect:

- Exact duplicates
- Near duplicates
- Semantic duplicates

Reject:

- Exact duplicates
- High semantic similarity

Allow:

- Different reasoning
- Different cognitive skills
- Different numerical values
- Concept variants (configurable)

---

### Metadata Extraction

Generate:

- Subject
- Topic
- Sub-topic
- Difficulty score
- Estimated solving time
- Bloom's taxonomy
- Question type
- Similarity score
- Novelty score

---

### Question Validation

Detect:

- Ambiguous wording
- Multiple correct answers
- Grammar problems
- Missing information
- Incorrect formatting

Reject invalid questions.

---

# Question Repository

After validation:

Questions must be immediately encrypted.

Plaintext questions must never be stored.

Each question stores:

- Metadata
- Encrypted content
- Version
- Hash
- Creation timestamp

Requirements:

- Individual encryption per question
- Immutable records
- Version history

---

# Encryption Requirements

The system follows "Encrypt Immediately".

Question lifecycle:

```
Submission

↓

AI Processing

↓

Immediate Encryption

↓

Storage
```

Paper lifecycle:

```
Paper Generation

↓

Immediate Encryption

↓

Storage
```

Plaintext may exist only:

- during professor submission
- during AI processing
- during authorized examination delivery

Plaintext must never persist on disk.

---

# Paper Generation Engine

After submission deadline:

AI generates three statistically equivalent papers.

Generation constraints:

- syllabus coverage
- topic coverage
- balanced difficulty
- balanced Bloom's taxonomy
- no duplicate concepts
- required marks
- required duration
- configurable blueprint

No human selects questions.

No manual editing.

---

# Paper Storage

Generated papers must be encrypted immediately.

Requirements:

- Independent encryption key per paper
- Store only encrypted papers
- No plaintext persistence
- Keys managed separately

---

# Examination Delivery

Before examination:

Papers remain encrypted.

At examination time:

- scheduler authorizes release
- paper decrypted
- delivered to authenticated candidates

Optional:

Randomly assign Paper A, B or C.

Future:

Generate personalized papers.

---

# Security Requirements

## Zero Trust

No user can access more information than required.

Professors:

- own submissions only

Administrators:

- cannot view questions
- cannot decrypt papers

Operators:

- cannot generate papers

Students:

- receive only assigned paper

---

## Encryption

Encrypt:

- every question
- every paper
- backups
- exported data

Keys stored separately.

---

## Audit Logs

Record:

- login
- submission
- validation
- rejection
- encryption
- paper generation
- decryption
- examination access

Logs must be immutable.

---

## Authentication

Support:

- Multi-factor authentication
- Session expiration
- Device tracking
- Role-based access

Roles:

- Professor
- Administrator
- AI Service
- Examination Center
- Student

---

# AI Responsibilities

The AI must perform:

- Duplicate detection
- Semantic similarity
- Topic classification
- Difficulty estimation
- Bloom's taxonomy classification
- Paper construction
- Validation

The AI must NOT:

- invent syllabus
- modify professor intent
- generate incorrect answers

---

# Data Model

Question

- id
- author_id
- encrypted_content
- metadata
- difficulty
- bloom_level
- topic
- subtopic
- similarity_score
- novelty_score
- version
- created_at

Paper

- id
- encrypted_content
- blueprint
- difficulty_distribution
- creation_timestamp

Professor

- id
- institution
- assigned_topics
- submissions

---

# Future Enhancements

- Per-student paper generation
- Parameterized questions
- AI-assisted question generation
- Real-time statistical calibration
- Hardware-backed key management
- Secure execution environments
- Cryptographic proof of paper integrity

---

# Non-Functional Requirements

Security

- Zero-trust architecture
- End-to-end encryption
- No plaintext persistence

Scalability

- Support 100+ professors
- 100,000+ candidates
- Multiple simultaneous examinations

Availability

- High availability
- Automatic backups
- Disaster recovery

Performance

- AI validation under configurable SLA
- Paper generation within minutes
- Low-latency examination delivery

---

# Success Criteria

The system is considered successful if:

- No human assembles examination papers.
- Professors cannot reconstruct the final paper.
- Administrators cannot access plaintext questions.
- Examination papers remain encrypted until examination time.
- AI successfully produces statistically equivalent papers.
- Duplicate and low-quality questions are automatically filtered.
- Complete auditability exists for every critical action.