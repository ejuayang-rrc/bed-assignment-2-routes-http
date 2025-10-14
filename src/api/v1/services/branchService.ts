import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";

import * as firestoreRepository from "../repositories/firestoreRepository";
import { Branch } from "src/api/v1/models/branchModel";

/**
 * Creates a new branch with the given information
 * @param branchData - Details of the branch
 * @returns The new branch with details
 */
export const createBranch = async (
    branchData: Omit<Branch, "id">
): Promise<Branch> => {
    try {
        const branches: Branch[] = await getAllBranches();
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

        // Branch data setup w/out ID
        const newBranch: Partial<Branch> = {
            name: branchData.name,
            address: branchData.address,
            phone: branchData.phone
        };

        await firestoreRepository.createDocument(
            "branches",
            newBranch,
            newId.toString()
        );

        return structuredClone( 
        { id: newId, ...newBranch } as Branch
        );
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Retrieves all branches and their details
 * @returns Array of all branches
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    try {
        // Get collection from firestore database
        const snapshot: QuerySnapshot = 
        await firestoreRepository.getDocuments("branches");

        // Goes through the snapshot, formatting to array of Branches
        const branches: Branch[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: parseInt(doc.id),
                ...data,
            } as Branch;
        });

        return branches;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Retrieves a branch by ID
 * @param id - ID of the branch
 * @returns A branch matching the given ID
 * @throws Error if branch with given ID is not found
 */
export const getBranchById = async (
    id: string
): Promise<Branch> => {
    try {
        const doc: DocumentSnapshot | null = 
        await firestoreRepository.getDocumentById(
            "branches",
            id
        );

        // If branch with given ID is not found
        if (!doc) {
            throw new Error(`Couldn't find Branch with ID:${id}`);
        }

        const data: DocumentData | undefined = doc.data();
        const branch: Branch = {
            id: parseInt(doc.id),
            ...data,
        } as Branch;

        return branch;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Updates an existing branch's address and/or phone number 
 * @param id - The ID of the branch to update
 * @param branchData - The fields to update (address and/or phone number)
 * @returns The updated branch
 * @throws Error if branch with given ID is not found
 */
export const updateBranch = async (
    id: string,
    branchData: Pick<Branch, "address" | "phone">
): Promise<Branch> => {
    try {
        const branch: Branch = await getBranchById(id);

        if (!branch) {
            throw new Error(`Couldn't find Branch with ID:${id}`);
        }

        const updatedBranch: Omit<Branch, "id"> = {
            ...branch,
            ...branchData
        };

        await firestoreRepository.updateDocument<Branch>(
            "branches",
            id,
            updatedBranch
        )

        return structuredClone(
            { id: parseInt(id), ...updatedBranch } as Branch
        );
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Deletes a branch from the database
 * @param id - The ID of the branch to delete
 * @throws Error if branch with given ID is not found
 */
export const deleteBranch = async (
    id: string
): Promise<void> => {
    try {
        // To check if branch exists
        const branch: Branch = await getBranchById(id);

        if (!branch) {
            throw new Error(`Couldn't find Branch with ID:${id}`);
        }

        await firestoreRepository.deleteDocument("branches", id);
    } catch (error: unknown) {
        throw error;
    }
};
