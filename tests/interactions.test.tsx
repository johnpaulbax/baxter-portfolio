import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "../src/App";

test("portrait toggles from professional to graduate on tap", async () => {
  render(<App />);
  const portrait = screen.getByRole("button", {
    name: /toggle between professional/i,
  });
  expect(portrait).toHaveAttribute("aria-pressed", "false");
  fireEvent.click(portrait);
  expect(portrait).toHaveAttribute("aria-pressed", "true");
  expect(within(portrait).getByText(/graduate/i)).toBeInTheDocument();
});

test("incident selection displays the chosen troubleshooting record", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("tab", { name: /inc-003/i }));
  expect(
    screen.getByRole("heading", { name: "DNS Resolution Failure" }),
  ).toBeInTheDocument();
  expect(screen.getByText(/nslookup results/i)).toBeInTheDocument();
});

test("skill tabs switch the visible capability group", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("tab", { name: "Cybersecurity" }));
  expect(screen.getByText("Wazuh SIEM")).toBeInTheDocument();
  expect(screen.queryByText("Password Resets")).not.toBeInTheDocument();
});

test("internship image opens a complete-image dialog and Escape closes it", async () => {
  render(<App />);
  await userEvent.click(
    screen.getByRole("button", { name: /joined the team during/i }),
  );
  const dialog = screen.getByRole("dialog", {
    name: /internship media viewer/i,
  });
  expect(within(dialog).getByRole("img")).toHaveAttribute(
    "src",
    "/media/internship-01.jpg",
  );
  fireEvent.keyDown(document, { key: "Escape" });
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
});

test("mobile navigation disclosure opens and closes", async () => {
  render(<App />);
  const toggle = screen.getByRole("button", { name: /toggle navigation/i });
  await userEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  await userEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("Escape closes mobile navigation and returns focus", async () => {
  render(<App />);
  const toggle = screen.getByRole("button", { name: /toggle navigation/i });
  await userEvent.click(toggle);
  fireEvent.keyDown(document, { key: "Escape" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(toggle).toHaveFocus();
});

test("arrow keys move through skill tabs", async () => {
  render(<App />);
  const helpdesk = screen.getByRole("tab", { name: "Helpdesk" });
  helpdesk.focus();
  fireEvent.keyDown(helpdesk, { key: "ArrowRight" });
  expect(screen.getByRole("tab", { name: "Networking" })).toHaveFocus();
  expect(screen.getByRole("tabpanel", { name: "Networking" })).toHaveTextContent("DNS");
});

test("lightbox restores focus to the image trigger", async () => {
  render(<App />);
  const trigger = screen.getByRole("button", { name: /joined the team during/i });
  await userEvent.click(trigger);
  await userEvent.click(screen.getByRole("button", { name: /close image/i }));
  await waitFor(() => expect(trigger).toHaveFocus());
});

test("AVOID demo uses the centralized video media source", () => {
  const { container } = render(<App />);
  const video = container.querySelector("video");
  expect(video).toHaveAttribute("src", "/media/avoid-demo-web.mp4");
  expect(video).toHaveAttribute("preload", "metadata");
});

test("BaxterLab project exposes its repository architecture and documentation", () => {
  render(<App />);
  expect(screen.getByRole("link", { name: /view baxterlab repository/i })).toHaveAttribute(
    "href",
    "https://github.com/johnpaulbax/IT-Helpdesk-Homelab",
  );
  expect(screen.getByText("baxterlab.local")).toBeInTheDocument();
  expect(screen.getByText("192.168.10.0/24 LABNET")).toBeInTheDocument();
  expect(screen.getAllByTestId("homelab-doc")).toHaveLength(9);
  expect(screen.getAllByRole("button", { name: /^open (active directory|osticket|network recovery|wireshark dns) evidence$/i })).toHaveLength(4);
});

test("Windows Endpoint project exposes its support workflow and evidence", () => {
  render(<App />);
  expect(screen.getAllByText("ENDPOINT01")).not.toHaveLength(0);
  expect(screen.getByText("ServiceNow Personal Developer Instance")).toBeInTheDocument();
  expect(screen.getByText("User report")).toBeInTheDocument();
  expect(screen.getAllByTestId("endpoint-servicenow-workflow")).toHaveLength(8);
  expect(screen.getAllByRole("button", { name: /open endpoint\/servicenow evidence/i })).toHaveLength(4);
  expect(screen.queryByRole("link", { name: "View project repository" })).not.toBeInTheDocument();
});

test("evidence viewers restore portfolio interaction after closing", async () => {
  render(<App />);

  await userEvent.click(screen.getByRole("button", { name: /^open active directory evidence$/i }));
  expect(document.querySelector(".evidence-modal")).toBeInTheDocument();
  expect(screen.getByRole("dialog", { name: /active directory evidence/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: /close evidence$/i }));
  await waitFor(() => expect(screen.queryByRole("dialog", { name: /active directory evidence/i })).not.toBeInTheDocument());

  await userEvent.click(screen.getByRole("button", { name: /open endpoint\/servicenow evidence: print spooler/i }));
  expect(screen.getByRole("dialog", { name: /print spooler endpoint\/servicenow evidence/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: /close endpoint\/servicenow evidence/i }));
  await waitFor(() => expect(screen.queryByRole("dialog", { name: /print spooler endpoint\/servicenow evidence/i })).not.toBeInTheDocument());

  await userEvent.click(screen.getByRole("button", { name: /^open network recovery evidence$/i }));
  expect(screen.getByRole("dialog", { name: /network recovery evidence/i })).toBeInTheDocument();
});

test("flagship project appears first and AVOID keeps its video", () => {
  const { container } = render(<App />);
  const headings = screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent);
  expect(headings.indexOf("BaxterLab")).toBeLessThan(headings.indexOf("AVOID"));
  expect(container.querySelector('video[src="/media/avoid-demo-web.mp4"]')).toBeInTheDocument();
  expect(screen.getByText("Configured & Documented")).toBeInTheDocument();
  expect(screen.getByText("Simulated Incidents")).toBeInTheDocument();
});

test("portfolio does not expose pending placeholders", () => {
  render(<App />);
  expect(screen.queryByText(/pending/i)).not.toBeInTheDocument();
});

test("contact section uses the default mail handler and recognizable social brand marks", () => {
  render(<App />);
  const emailLink = screen.getByRole("link", {
    name: /send email to pauljohnbaxter29@gmail.com/i,
  });
  const linkedinLink = screen.getByRole("link", { name: /linkedin view profile/i });
  const githubLink = screen.getByRole("link", { name: /github view repositories/i });

  expect(emailLink).toHaveAttribute(
    "href",
    "mailto:pauljohnbaxter29@gmail.com",
  );
  expect(emailLink).not.toHaveAttribute("target");
  expect(linkedinLink).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/john-paul-baxter-53bb92369/",
  );
  expect(linkedinLink.querySelector('[data-brand="linkedin"]')).toBeInTheDocument();
  expect(githubLink.querySelector('[data-brand="github"]')).toBeInTheDocument();
});

test("copy email control copies the address without being part of the mail link", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
  render(<App />);

  const copyButton = screen.getByRole("button", { name: "Copy email address" });
  expect(copyButton.closest("a")).toBeNull();
  await userEvent.click(copyButton);

  expect(writeText).toHaveBeenCalledWith("pauljohnbaxter29@gmail.com");
  expect(await screen.findByText("COPIED ✓")).toBeInTheDocument();
});

test("credential cards open an image gallery and restore focus when closed", async () => {
  const { container } = render(<App />);
  const trigger = screen.getByRole("button", {
    name: /view network support and security credential/i,
  });
  await userEvent.click(trigger);
  const dialog = screen.getByRole("dialog", { name: /credential viewer/i });
  await waitFor(() => expect(container).toHaveAttribute("inert"));
  expect(within(dialog).getByRole("img")).toHaveAttribute(
    "src",
    "/media/credentials/network-support-and-security.png",
  );
  await userEvent.click(within(dialog).getByRole("button", { name: /next credential/i }));
  expect(within(dialog).getByRole("img")).toHaveAttribute(
    "src",
    "/media/credentials/security-and-connectivity-support.png",
  );
  await userEvent.click(within(dialog).getByRole("button", { name: /close credential/i }));
  await waitFor(() => expect(trigger).toHaveFocus());
  expect(container).not.toHaveAttribute("inert");
});

test("credential gallery supports arrow keys and Escape", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("button", { name: /view network support and security credential/i }));
  fireEvent.keyDown(document, { key: "ArrowRight" });
  expect(screen.getByRole("dialog", { name: /credential viewer/i }).querySelector("img")).toHaveAttribute(
    "src",
    "/media/credentials/security-and-connectivity-support.png",
  );
  fireEvent.keyDown(document, { key: "Escape" });
  await waitFor(() => expect(screen.queryByRole("dialog", { name: /credential viewer/i })).not.toBeInTheDocument());
});

test("credential viewer presents a contained inspection panel with accurate metadata", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("button", { name: /view network support and security credential/i }));
  const dialog = screen.getByRole("dialog", { name: /credential viewer/i });
  expect(dialog).toHaveClass("credential-inspector");
  expect(within(dialog).getByText("CREDENTIAL // VERIFIED")).toBeInTheDocument();
  expect(within(dialog).getByRole("heading", { name: "Network Support and Security" })).toBeInTheDocument();
  expect(within(dialog).getByText("01 / 06")).toBeInTheDocument();
  expect(within(dialog).getByText("CISCO NETWORKING ACADEMY")).toBeInTheDocument();
  expect(within(dialog).getByText("COURSE COMPLETION")).toBeInTheDocument();
});

test("credential viewer locks scrolling without moving or restoring the viewport", async () => {
  Object.defineProperty(window, "scrollY", { configurable: true, value: 640 });
  Object.defineProperty(window, "scrollX", { configurable: true, value: 24 });
  document.documentElement.style.overflow = "visible";
  document.body.style.position = "relative";
  document.body.style.width = "95%";
  document.body.style.overflow = "auto";
  const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  render(<App />);
  const trigger = screen.getByRole("button", { name: /view network support and security credential/i });
  await userEvent.click(trigger);
  expect(document.documentElement.style.overflow).toBe("hidden");
  expect(document.body.style.overflow).toBe("hidden");
  expect(document.body.style.position).toBe("relative");
  expect(document.body.style.top).toBe("");
  await userEvent.click(screen.getByRole("button", { name: /close credential/i }));
  await waitFor(() => expect(screen.queryByRole("dialog", { name: /credential viewer/i })).not.toBeInTheDocument());
  expect(scrollTo).not.toHaveBeenCalled();
  expect(window.scrollY).toBe(640);
  expect(window.scrollX).toBe(24);
  expect(document.documentElement.style.overflow).toBe("visible");
  expect(document.body.style.position).toBe("relative");
  expect(document.body.style.width).toBe("95%");
  expect(document.body.style.overflow).toBe("auto");
  expect(trigger).toHaveFocus();
  document.documentElement.removeAttribute("style");
  document.body.removeAttribute("style");
  scrollTo.mockRestore();
});

test("credential viewer closes from the backdrop and wraps with ArrowLeft", async () => {
  render(<App />);
  const first = screen.getByRole("button", { name: /view network support and security credential/i });
  await userEvent.click(first);
  fireEvent.keyDown(document, { key: "ArrowLeft" });
  expect(screen.getByRole("dialog", { name: /credential viewer/i }).querySelector("img")).toHaveAttribute(
    "src",
    "/media/credentials/fortinet-certified-fundamentals.png",
  );
  fireEvent.mouseDown(document.querySelector(".credential-backdrop") as HTMLElement);
  await waitFor(() => expect(screen.queryByRole("dialog", { name: /credential viewer/i })).not.toBeInTheDocument());
  expect(first).toHaveFocus();
});
