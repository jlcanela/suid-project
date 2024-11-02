// src/components/ProjectsTable.test.tsx

import { render, screen } from "@solidjs/testing-library";
import { ProjectsTable, AddProjectModal } from "./ProjectsPage";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { test, expect, vi } from "vitest";

import userEvent from "@testing-library/user-event";

// Mock useAuth0 hook
vi.mock("../auth", () => ({
  useAuth0: () => ({
    getToken: vi.fn().mockResolvedValue("mock-token"),
  }),
}));

// Mock ProjectRepository
vi.mock("../repositories/ProjectRepository");

test('renders table with project data', async () => {
    // Mock repository data
    const mockData = {
        projects: [
        { id: 1, name: 'Project 1', description: 'Description 1' },
        { id: 2, name: 'Project 2', description: 'Description 2' },
        ],
    };

    // Mock repository methods
    ProjectRepository.prototype.findAll = vi.fn().mockReturnValue({
        data: mockData,
        isSuccess: true,
        isLoading: false,
        error: null,
    });

    render(() => <ProjectsTable />);

    // Check if project names are rendered in the table
    expect(await screen.findByText('Project 1')).toBeInTheDocument();
    expect(await screen.findByText('Project 2')).toBeInTheDocument();
});

test("calls repository create method on form submission", async () => {
  const createMock = vi.fn();

  ProjectRepository.prototype.create = createMock;

  render(() => <AddProjectModal />);
  await userEvent.click(screen.getByRole("button", { name: /Add Project/i }));
  // Simulate filling out form fields using userEvent
  expect(await screen.findByText("Submit")).toBeInTheDocument();

  await userEvent.type(screen.getByLabelText(/name/i), "New Project");
  await userEvent.type(
    screen.getByLabelText(/description/i),
    "New Description"
  );

  // Simulate form submission (assuming there's a button with "Submit" text)
  await userEvent.click(screen.getByText("Submit"));
  // Assert that the create method was called with the correct data
  expect(createMock).toHaveBeenCalledWith({
    name: "New Project",
    description: "New Description",
  });
});
