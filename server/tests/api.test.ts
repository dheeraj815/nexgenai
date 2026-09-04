import assert from 'node:assert';
import app from '../src/index.js';
import { prisma } from '../src/utils/prisma.js';

async function runTests() {
  console.log('====================================================');
  console.log('🧪 Starting NexGenAI Comprehensive API & Security Test Suite');
  console.log('====================================================');

  const server = app.listen(5099);
  const baseUrl = 'http://localhost:5099/api';

  try {
    // 1. Health Check
    console.log('Test 1: System Health Check');
    const healthRes = await fetch(`${baseUrl}/health`);
    const healthData = (await healthRes.json()) as any;
    assert.strictEqual(healthRes.status, 200);
    assert.strictEqual(healthData.status, 'healthy');
    console.log('  ✔ Health check passed');

    // 2. Student Registration
    console.log('Test 2: Student Registration & Real Identity Creation');
    const testEmail = `student_${Date.now()}@nexgenai.test`;
    const regRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'Password123!',
        firstName: 'Aarav',
        lastName: 'Sharma',
        role: 'STUDENT',
        academicStage: 'CLASS_11',
      }),
    });
    const regData = (await regRes.json()) as any;
    assert.strictEqual(regRes.status, 201);
    assert.ok(regData.token, 'Token must be issued');
    assert.strictEqual(regData.user.firstName, 'Aarav');
    assert.strictEqual(regData.user.profile.academicStage, 'CLASS_11');
    const studentToken = regData.token;
    console.log('  ✔ Real student registration verified');

    // 3. Prevent Duplicate Registration
    console.log('Test 3: Reject Duplicate Registration');
    const dupRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'Password123!',
        firstName: 'Duplicate',
        lastName: 'User',
      }),
    });
    assert.strictEqual(dupRes.status, 400);
    console.log('  ✔ Duplicate account correctly rejected');

    // 4. Authenticate /me
    console.log('Test 4: Authenticated /me Profile Retrieval');
    const meRes = await fetch(`${baseUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${studentToken}` },
    });
    const meData = (await meRes.json()) as any;
    assert.strictEqual(meRes.status, 200);
    assert.strictEqual(meData.user.email, testEmail);
    console.log('  ✔ /me successfully loaded authentic user');

    // 5. Update Profile to Year 3
    console.log('Test 5: Profile Stage Progression');
    const updateRes = await fetch(`${baseUrl}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({
        academicStage: 'YEAR_3',
        institutionName: 'National Institute of Technology',
        branch: 'Computer Science & Engineering',
        graduationYear: 2026,
        cgpa: 8.7,
        backlogs: 0,
        targetRole: 'Full Stack Engineer',
      }),
    });
    const updateData = (await updateRes.json()) as any;
    assert.strictEqual(updateRes.status, 200);
    assert.strictEqual(updateData.user.profile.academicStage, 'YEAR_3');
    assert.strictEqual(updateData.user.profile.cgpa, 8.7);
    console.log('  ✔ Stage progression to Year 3 verified');

    // 6. Verify 30 Domains Exist
    console.log('Test 6: Multi-Domain Engine Taxonomy Check');
    const domainsRes = await fetch(`${baseUrl}/learning/domains`);
    const domainsData = (await domainsRes.json()) as any;
    assert.strictEqual(domainsRes.status, 200);
    assert.strictEqual(domainsData.domains.length, 30);
    console.log(`  ✔ Exactly 30 domains active in database`);

    // 7. Coding Lab Problem & Sandbox Runner
    console.log('Test 7: Coding Lab Execution');
    const codeRunRes = await fetch(`${baseUrl}/coding/problems/two-sum/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({
        language: 'javascript',
        code: `function twoSum(input) {
          const { nums, target } = input;
          const map = new Map();
          for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i];
            if (map.has(complement)) return [map.get(complement), i];
            map.set(nums[i], i);
          }
          return [];
        }`,
      }),
    });
    const codeRunData = (await codeRunRes.json()) as any;
    assert.strictEqual(codeRunRes.status, 200);
    assert.strictEqual(codeRunData.status, 'ACCEPTED');
    assert.strictEqual(codeRunData.allPassed, true);
    console.log('  ✔ Coding Lab solution accepted with all test cases passed');

    // 8. System Design Analysis Engine
    console.log('Test 8: System Design Architecture Evaluation');
    const sdRes = await fetch(`${baseUrl}/systemdesign/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({
        title: 'High Scalability E-Commerce Architecture',
        scenario: 'E-Commerce Peak Flash Sale',
        nodes: [
          { id: '1', type: 'client', label: 'Web / Mobile Clients' },
          { id: '2', type: 'loadbalancer', label: 'AWS ALB' },
          { id: '3', type: 'service', label: 'Order Microservice' },
          { id: '4', type: 'cache', label: 'Redis Cluster' },
          { id: '5', type: 'database', label: 'PostgreSQL Primary' },
        ],
        edges: [
          { from: '1', to: '2' },
          { from: '2', to: '3' },
          { from: '3', to: '4' },
          { from: '3', to: '5' },
        ],
      }),
    });
    const sdData = (await sdRes.json()) as any;
    assert.strictEqual(sdRes.status, 200);
    assert.ok(sdData.score >= 70, 'Architecture with LB and Cache should score >= 70');
    console.log(`  ✔ Architecture evaluated with score ${sdData.score}/100`);

    // 9. SOC Incident Simulator
    console.log('Test 9: SOC Incident Triage & Containment');
    const socRes = await fetch(`${baseUrl}/soc/incidents/incident-ssh-01/investigate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({
        submittedSeverity: 'CRITICAL',
        submittedIocs: ['198.51.100.24', 'user deploy'],
        submittedContainment: [
          'Block IP 198.51.100.24 on Firewall',
          'Terminate active session for user deploy',
          'Rotate compromised credentials for user deploy',
        ],
        reportNotes: 'Attacker brute-forced user deploy via SSH port 44324 and escalated privileges using sudo.',
      }),
    });
    const socData = (await socRes.json()) as any;
    assert.strictEqual(socRes.status, 200);
    assert.strictEqual(socData.passed, true);
    console.log(`  ✔ SOC investigation passed with score ${socData.score}/100`);

    // 10. Resume & ATS Keyword Engine
    console.log('Test 10: Resume ATS Keyword Matcher');
    const resumeCreateRes = await fetch(`${baseUrl}/resume/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({
        title: 'Full Stack Software Engineer Resume',
        textContent: 'Full Stack Developer with experience in Python, JavaScript, TypeScript, React, Docker, Kubernetes, and REST APIs. Engineered scalable microservices improving query latency by 35%. Deployed production apps on AWS.',
      }),
    });
    const resumeCreateData = (await resumeCreateRes.json()) as any;
    assert.strictEqual(resumeCreateRes.status, 201);

    const atsRes = await fetch(`${baseUrl}/resume/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({
        resumeId: resumeCreateData.resume.id,
        targetJobTitle: 'Software Engineer',
        targetJobDescription: 'Seeking Software Engineer proficient in Python, React, Docker, Kubernetes, AWS, and REST APIs to build scalable distributed architectures.',
      }),
    });
    const atsData = (await atsRes.json()) as any;
    assert.strictEqual(atsRes.status, 200);
    assert.ok(atsData.analysis.atsScore >= 75, 'ATS score should be high for aligned resume');
    console.log(`  ✔ ATS Analysis completed with score ${atsData.analysis.atsScore}%`);

    // 11. Career Passport & Dynamic Readiness Score
    console.log('Test 11: Dynamic Career Passport & Readiness Score');
    const passportRes = await fetch(`${baseUrl}/passport`, {
      headers: { Authorization: `Bearer ${studentToken}` },
    });
    const passportData = (await passportRes.json()) as any;
    assert.strictEqual(passportRes.status, 200);
    assert.ok(passportData.passport.readiness.overallScore > 10, 'Readiness score must reflect genuine completed labs and verified skills');
    console.log(`  ✔ Career Passport readiness score computed: ${passportData.passport.readiness.overallScore}%`);

    // 12. Security & RBAC Enforcement
    console.log('Test 12: Role-Based Access Control (RBAC) Enforcement');
    // Student attempting to create placement drive
    const forbiddenRes = await fetch(`${baseUrl}/tpo/drives`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({
        companyName: 'Hacked Inc',
        jobTitle: 'Unauthorized Drive',
      }),
    });
    assert.strictEqual(forbiddenRes.status, 403, 'Student must be forbidden from TPO drive creation');
    console.log('  ✔ RBAC successfully blocked unauthorized student access to TPO endpoints');

    console.log('====================================================');
    console.log('🎉 ALL 12 API, PERSISTENCE & SECURITY TESTS PASSED!');
    console.log('====================================================');
  } finally {
    server.close();
    await prisma.$disconnect();
  }
}

runTests().catch((err) => {
  console.error('❌ Test execution failed:', err);
  process.exit(1);
});