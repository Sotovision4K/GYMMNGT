import { Request, Response } from "express";
import { Gym } from "../../entities/gym.entity";
import { Branch } from "../../entities/branches.entity";
import { GymObject } from "./gym";


export const createFreeTrialGym = async (req : Request<unknown, unknown, GymObject & { ownerId: string }> , res : Response) => {
    // Implementation for creating a managed gym
    const { name,  contactPhone, contactEmail, NIT, assignedEndPoint, branches, ownerId } = req.body;


    const gym = new Gym();
    try{
        const existingGym = await Gym.findOneBy({ NIT });
        if (existingGym) {
            res.status(400).send({ message: "Gym with this NIT already exists" });
            return;
        }
    }catch(error){
        res.status(500).send("Error checking existing gym");
        return;
    }
    gym.name = name;
    gym.NIT = NIT;
    gym.assignedEndPoint = assignedEndPoint;
    gym.contactEmail = contactEmail;
    gym.contactPhone = contactPhone;
    gym.createdAt = new Date();


    gym.branches = branches.map(branch => {
        const newBranch = new Branch();
        newBranch.address = branch.address;
        newBranch.city = branch.city;
        newBranch.contactNumber = branch.contactNumber ;
        newBranch.managerGovId = branch.managerGovId === undefined ? "" : ownerId ;
        newBranch.managerFullName = branch.managerFullName === undefined ? "" : "Default Manager" ;
        newBranch.gym = gym; // Link back to the gym
        return newBranch;
    });

    // Save the gym and branches
    try{

            await gym.save();
            await Branch.save(gym.branches);
    }catch(error){
            res.status(500).send("Error creating gym and branches");
            return;
    }

    res.status(200).send({ message: "Managed gym created successfully", gymId: gym.id });
}