import { credentials, incidents, internshipStages, navigation, projects, skillGroups } from '../src/data/content';

test('content configuration includes every required portfolio record', () => {
  expect(new Set(navigation.map(item => item.id)).size).toBe(9);
  expect(internshipStages).toHaveLength(5);
  expect(incidents).toHaveLength(8);
  expect(projects).toHaveLength(4);
  expect(skillGroups).toHaveLength(5);
  expect(credentials).toHaveLength(6);
});

test("projects and internship media follow the approved priority order", () => {
  expect(projects.map((project) => project.title)).toEqual([
    "BaxterLab",
    "AVOID",
    "Document Tracking System",
    "File Integrity Monitoring System",
  ]);
  expect(internshipStages.map((stage) => stage.title)).toEqual([
    "Joined the Team",
    "Built the System",
    "Presented the System",
    "Internship Field Log",
    "Internship Completion",
  ]);
  expect(internshipStages.map((stage) => stage.image)).toEqual([
    "/media/internship-01.jpg",
    "/media/internship-05.jpg",
    "/media/internship-04.jpg",
    "/media/internship-03.jpg",
    "/media/internship-02.jpg",
  ]);
  expect(internshipStages[1].text).toMatch(/developing.*PHP.*Laravel.*MySQL/i);
  expect(internshipStages[2].text).toMatch(/presented.*stakeholders/i);
  expect(internshipStages[3].text).toMatch(/certificate of completion.*AFP/i);
  expect(credentials.map((credential) => credential.image)).toEqual([
    "/media/credentials/network-support-and-security.png",
    "/media/credentials/security-and-connectivity-support.png",
    "/media/credentials/network-addressing-and-basic-troubleshooting.png",
    "/media/credentials/networking-devices-and-basic-configuration.png",
    "/media/credentials/endpoint-security.png",
    "/media/credentials/fortinet-certified-fundamentals.png",
  ]);
});
