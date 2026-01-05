
export interface BranchObject {
    address: string;
    city: string;
    contactNumber: string;
    managerGovId?: string;
    managerFullName?: string;

}

export interface GymObject {
    name: string;
    contactEmail: string;
    contactPhone: string;
    NIT: string;
    assignedEndPoint: string;
    branches: BranchObject[];
}