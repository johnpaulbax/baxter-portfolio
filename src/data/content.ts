export const navigation = [
  "Home",
  "About",
  "Experience",
  "Lab",
  "Incidents",
  "Projects",
  "Skills",
  "Training",
  "Contact",
].map((label, index) => ({
  id: label.toLowerCase(),
  label,
  number: String(index + 1).padStart(2, "0"),
}));

export const contact = {
  email: "pauljohnbaxter29@gmail.com",
  linkedin: "https://www.linkedin.com/in/john-paul-baxter-53bb92369/",
  github: "https://github.com/johnpaulbax",
} as const;

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const media = {
  portraits: {
    professional: asset("media/portrait-professional.jpg"),
    graduate: asset("media/portrait-graduate.jpg"),
  },
  internship: Array.from(
    { length: 5 },
    (_, i) => asset(`media/internship-${String(i + 1).padStart(2, "0")}.jpg`),
  ),
  avoidVideo: asset("media/avoid-demo-web.mp4"),
} as const;

export const internshipStages = [
  {
    title: "Joined the Team",
    text: "A team photograph from the internship experience alongside fellow interns and staff at AFP Pension & Gratuity Management Center.",
    image: media.internship[0], width: 1152, height: 2048,
  },
  {
    title: "Built the System",
    text: "Developing the Document Tracking System with PHP, Laravel, and MySQL, focusing on backend functionality while helping coordinate the project’s development.",
    image: media.internship[4], width: 3024, height: 4032,
  },
  {
    title: "Presented the System",
    text: "Presented the completed Document Tracking System to office stakeholders in a meeting-room demonstration and explained its functionality through a technical walkthrough.",
    image: media.internship[3], width: 2048, height: 1536,
  },
  {
    title: "Internship Field Log",
    text: "Holding our certificate of completion from AFP, documenting an important milestone from the internship experience.",
    image: media.internship[2], width: 2268, height: 4032,
  },
  {
    title: "Internship Completion",
    text: "A closing team photograph marking completion of the internship after developing, deploying, supporting, and presenting the Document Tracking System.",
    image: media.internship[1], width: 2048, height: 1536,
  },
];

export type Incident = {
  id: string;
  title: string;
  status: "RESOLVED";
  problem: string;
  diagnosis: string;
  resolution: string;
  verification: string;
};
export const incidents: Incident[] = [
  [
    "INC-001",
    "Password Reset",
    "User could not access the account.",
    "Confirmed identity and isolated the issue to credentials.",
    "Reset the password in Active Directory and required a change at sign-in.",
    "User signed in and changed the password successfully.",
  ],
  [
    "INC-002",
    "Account Lockout",
    "Repeated sign-in attempts locked the account.",
    "Checked the account state and recent credential attempts.",
    "Unlocked the account and reviewed stored credentials.",
    "Account remained active after a new sign-in.",
  ],
  [
    "INC-003",
    "DNS Resolution Failure",
    "The client reached IP addresses but not hostnames.",
    "Compared IP connectivity with nslookup results.",
    "Corrected the client DNS server configuration.",
    "Hostname lookup and browser access succeeded.",
  ],
  [
    "INC-004",
    "File Permission Issue",
    "A user could not open a shared folder.",
    "Compared share and NTFS permissions with group membership.",
    "Applied least-privilege group access and refreshed the session.",
    "The user opened the intended folder only.",
  ],
  [
    "INC-005",
    "GPO Not Applied",
    "A workstation missed an assigned policy.",
    "Checked OU placement, scope, and gpresult output.",
    "Corrected policy targeting and refreshed Group Policy.",
    "gpresult reported the policy as applied.",
  ],
  [
    "INC-006",
    "Disabled Account",
    "A valid user received a sign-in denial.",
    "Verified the account was disabled in Active Directory.",
    "Re-enabled the authorized account after validation.",
    "A controlled sign-in completed successfully.",
  ],
  [
    "INC-007",
    "DHCP / IP Configuration",
    "A client received no usable network configuration.",
    "Reviewed ipconfig output and DHCP availability.",
    "Renewed the lease after correcting adapter configuration.",
    "The client received the expected address, gateway, and DNS.",
  ],
  [
    "INC-008",
    "Subnet / Connectivity Issue",
    "Hosts on the lab network could not communicate.",
    "Compared address, mask, gateway, and ping path.",
    "Corrected the mismatched subnet configuration.",
    "Bidirectional ping and service access succeeded.",
  ],
].map(
  ([id, title, problem, diagnosis, resolution, verification]) =>
    ({
      id,
      title,
      status: "RESOLVED",
      problem,
      diagnosis,
      resolution,
      verification,
    }) as Incident,
);

export const projects = [
  {
    title: "BaxterLab",
    subtitle: "IT Helpdesk Homelab",
    role: "Hands-on support lab",
    tech: ["Windows Server 2025", "Active Directory", "DNS / DHCP", "Group Policy", "PowerShell", "Wireshark", "osTicket"],
    description: "An enterprise-style isolated lab for Windows domain administration, network troubleshooting, access support, packet analysis, and ticket documentation.",
    contribution: "Built and documented the lab environment, eight simulated support incidents, and their diagnosis, remediation, verification, and closure.",
  },
  {
    title: "Windows Endpoint + ServiceNow Homelab",
    subtitle: "Endpoint Support & ITSM Lab",
    role: "Homelab",
    tech: ["Windows Endpoint", "PowerShell", "ServiceNow", "Incident Management"],
    description:
      "A practical endpoint-support and IT service management lab connecting Windows troubleshooting workflows with ServiceNow incident documentation.",
    contribution:
      "Documented repeatable endpoint diagnosis, remediation, verification, and ServiceNow ticket-handling workflows in a Windows homelab environment.",
    url: "https://github.com/johnpaulbax/windows-endpoint-servicenow-homelab",
  },
  {
    title: "AVOID",
    subtitle: "Advanced Vehicle Optimization & Intelligent Dispatch",
    role: "Capstone project",
    tech: ["Flutter", "React + Vite", "Supabase"],
    description:
      "A mobile/web system for real-time GPS navigation, flood-aware rerouting, and multi-stop route optimization.",
    contribution:
      "Built the admin web dashboard, React/Vite frontend, Flutter QR parcel scanner, and parcel-scan rider assignment automation.",
  },
  {
    title: "Document Tracking System",
    subtitle: "AFP Pension & Gratuity Management Center",
    role: "Junior Web Developer Intern",
    tech: ["PHP", "Laravel", "MySQL"],
    description:
      "A real-time PHP, Laravel, and MySQL document tracking system deployed to replace a paper-based workflow.",
    contribution:
      "Led backend development, configured XAMPP, deployed the production system, resolved end-user connectivity issues, and supported government staff during rollout.",
  },
];

export const homelabRepo = {
  url: "https://github.com/johnpaulbax/IT-Helpdesk-Homelab",
  domain: "baxterlab.local",
  network: "192.168.10.0/24 LABNET",
  architecture: asset("media/baxterlab-architecture.svg"),
  systems: [
    ["SERVER01", "Windows Server 2025", "Domain Controller / AD / DNS / DHCP"],
    ["CLIENT01", "Windows 11 Pro", "Domain-joined support workstation"],
    ["TICKET01", "Ubuntu Server", "osTicket helpdesk server"],
  ],
  docs: ["Lab Overview", "Active Directory", "DNS and DHCP", "Group Policy", "File Sharing and Permissions", "PowerShell Administration", "Network Troubleshooting", "Wireshark Analysis", "osTicket Helpdesk"],
  evidence: [
    { title: "Active Directory", src: asset("media/baxterlab-active-directory.png"), caption: "Organizational units separate departmental users, groups, and workstation objects." },
    { title: "osTicket", src: asset("media/baxterlab-osticket.png"), caption: "A resolved simulated password-reset ticket records diagnosis, resolution, and verification." },
    { title: "Network Recovery", src: asset("media/baxterlab-networking.png"), caption: "Connectivity verification after correcting the lab client network configuration." },
    { title: "Wireshark DNS", src: asset("media/baxterlab-wireshark.png"), caption: "DNS query and response traffic inspected in Wireshark." },
  ],
} as const;

export const endpointServiceNowRepo = {
  url: "https://github.com/johnpaulbax/windows-endpoint-servicenow-homelab",
  endpoint: "ENDPOINT01",
  platform: "Windows 11",
  service: "ServiceNow Personal Developer Instance",
  network: "VirtualBox // L1 HELPDESK LAB",
  systems: [
    ["ENDPOINT01", "Windows 11", "Endpoint troubleshooting workstation"],
    ["SERVICENOW", "ServiceNow PDI", "Incident lifecycle and ITSM records"],
  ],
  workflow: [
    "User report",
    "Reproduce / validate",
    "Diagnose",
    "Remediate",
    "Verify",
    "Document in ServiceNow",
    "Resolve",
    "Close",
  ],
  docs: [
    "Print Spooler / Printing Failure",
    "Slow PC / High Memory Usage",
    "Low Disk Space",
    "Missing 7-Zip Application",
    "Network Connectivity Failure",
    "Device Manager Code 22",
  ],
  evidence: [
    { title: "Print Spooler", src: asset("media/endpoint-servicenow-print-spooler.png"), caption: "Windows endpoint evidence showing the print spooler issue and its verified restoration." },
    { title: "Network Recovery", src: asset("media/endpoint-servicenow-network-recovery.png"), caption: "Endpoint connectivity restored after re-enabling the network adapter." },
    { title: "ServiceNow Work Notes", src: asset("media/endpoint-servicenow-work-notes.png"), caption: "ServiceNow work notes record diagnosis and remediation during the incident lifecycle." },
    { title: "Incident Closed", src: asset("media/endpoint-servicenow-incident-closed.png"), caption: "A simulated ServiceNow incident closed after verification and resolution documentation." },
  ],
} as const;

export const skillGroups = [
  {
    name: "Helpdesk",
    skills: [
      "Active Directory",
      "User / Group Administration",
      "Password Resets",
      "Account Lockouts",
      "Group Policy",
      "File / Share Permissions",
      "osTicket",
      "Windows Server",
      "PowerShell",
    ],
  },
  {
    name: "Networking",
    skills: [
      "DNS",
      "DHCP",
      "TCP/IP",
      "Subnetting",
      "ping",
      "nslookup",
      "ipconfig",
      "Wireshark",
      "Connectivity Troubleshooting",
    ],
  },
  {
    name: "Cybersecurity",
    skills: [
      "Wazuh SIEM",
      "Endpoint Security",
      "Network Defense",
      "Cybersecurity Fundamentals",
    ],
  },
  {
    name: "Development",
    skills: [
      "PHP",
      "JavaScript",
      "HTML",
      "CSS",
      "Dart",
      "Java",
      "C++",
      "Laravel",
      "Flutter",
      "React",
      "MySQL",
    ],
  },
  {
    name: "Tools",
    skills: [
      "VirtualBox",
      "XAMPP",
      "Git / GitHub",
      "Windows",
      "Ubuntu",
      "Kali Linux",
    ],
  },
];

export const credentials = [
  { title: "Network Support and Security", issuer: "CISCO NETWORKING ACADEMY", status: "COURSE COMPLETION", image: asset("media/credentials/network-support-and-security.png") },
  { title: "Security and Connectivity Support", issuer: "CISCO NETWORKING ACADEMY", status: "COURSE COMPLETION", image: asset("media/credentials/security-and-connectivity-support.png") },
  { title: "Network Addressing and Basic Troubleshooting", issuer: "CISCO NETWORKING ACADEMY", status: "COURSE COMPLETION", image: asset("media/credentials/network-addressing-and-basic-troubleshooting.png") },
  { title: "Networking Devices and Basic Configuration", issuer: "CISCO NETWORKING ACADEMY", status: "COURSE COMPLETION", image: asset("media/credentials/networking-devices-and-basic-configuration.png") },
  { title: "Endpoint Security", issuer: "CISCO NETWORKING ACADEMY", status: "COURSE COMPLETION", image: asset("media/credentials/endpoint-security.png") },
  { title: "Fortinet Certified Fundamentals in Cybersecurity", issuer: "FORTINET TRAINING INSTITUTE", status: "CYBERSECURITY FUNDAMENTALS", image: asset("media/credentials/fortinet-certified-fundamentals.png") },
];
