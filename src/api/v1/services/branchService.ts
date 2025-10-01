import { Branch, branches } from "src/data/branches";

/**
 * Creates a new branch with the given information
 * @param branchData - Details of the branch
 * @returns The new branch with details
 */
export const createBranch = async (
    branchData: Omit<Branch, "id">
): Promise<Branch> => {
    let newId: number = 0;
    let isNotUnique: boolean = true;

    // Goes through branches until new ID doesn't match existing IDs
    while (isNotUnique) {
        newId += 1;
        isNotUnique = false;

        for (const key in branches) {
            if (newId === branches[key].id) {
                isNotUnique = true;
                break
            }
        }
    }

    const newBranch: Branch = {
        id: newId,
        name: branchData.name,
        address: branchData.address,
        phone: branchData.phone
    }

    branches.push(newBranch);
    return structuredClone(newBranch);
};

/**
 * Retrieves all branches and their details
 * @returns Array of all branches
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    return structuredClone(branches);
};

/**
 * Retrieves a branch by ID
 * @param id - ID of the branch
 * @returns A branch matching the given ID
 * @throws Error if branch with given ID is not found
 */
export const getBranchById = async (
    id: number
): Promise<Branch> => {
    // Get index of matching branch with given ID
    const index: number = branches.findIndex(
        (branch: Branch) => branch.id === id
    );

    // If branch with given ID is not found
    if (index === -1) {
        throw new Error(`Couldn't find Branch with ID:${id}`);
    }

    return structuredClone(branches[index]);
}

/**
 * Updates an existing branch's address and/or phone number 
 * @param id - The ID of the branch to update
 * @param branchData - The fields to update (address and/or phone number)
 * @returns The updated branch
 * @throws Error if branch with given ID is not found
 */
export const updateBranch = async (
    id: number,
    branchData: Pick<Branch, "address" | "phone">
): Promise<Branch> => {
    // Get index of matching branch with given ID
    const index: number = branches.findIndex(
        (branch: Branch) => branch.id === id
    );

    // If branch with given ID is not found
    if (index === -1) {
        throw new Error(`Couldn't find Branch with ID:${id}`);
    }

    // Updates the branch object with the given fields
    branches[index] = {
        ...branches[index],
        ...branchData,
    };

    return structuredClone(branches[index]);
};

/**
 * Deletes a branch from the database
 * @param id - The ID of the branch to delete
 * @throws Error if branch with given ID is not found
 */
export const deleteBranch = async (
    id: number
): Promise<void> => {
    // Get index of matching branch with given ID
    const index: number = branches.findIndex(
        (branch: Branch) => branch.id === id
    );

    // If branch with given ID is not found
    if (index === -1) {
        throw new Error(`Couldn't find Branch with ID:${id}`);
    }

    branches.splice(index, 1);
};
