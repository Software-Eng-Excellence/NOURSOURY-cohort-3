import { ItemNotFoundException } from "util/exceptions/repositoryExceptions";
export type id = string;
export interface ID {
    getId(): string;
}
/**
 * Interface representing a generic repository for managing items of type T
 * 
 * @template T - the type of items managed by the repository, which extends ID.
 */
export interface IRepository<T extends ID> {
    /**
     * Create a new item in the repository.
     * 
     * @template T - The type of items managed by the repository, which extends ID.
     * 
     * @throws {InvalidItemException} - Throw when an invalid item is encountered
     */
    create(item: T): Promise<id>;

    /**
     * Retrieve an item the repository by its ID
     * 
     * @param id - The ID of the item to be retrieved.
     * @returns A promise that resolves to the item whith the specified ID.
     * @throws {ItemNotFoundException} - Thrown when an item with the specified ID is not found.
     */
    get(id: id): Promise<T>;

    /**
     * Retrieve all items from the repository
     * 
     * @returns A promise that resolves to an array of all items in the repository
     */
    getAll(): Promise<T[]>;

    /**
     * Update an existing item in the repository
     * 
     * @param item - The item to be updated.
     * @returns A promise that resolves when the item is successfully updated.
     * @throws {ItemNotFoundException} - Thrown when the item to be updated is not found.
     * @throws {InvalidItemException} - Thrown when an invalid item is encountered.
     */
    update(item: T): Promise<void>;

    /**
     * Delete an item from the repository by its ID
     * 
     * @param id - The ID of the item to be deleted
     * @returns A promise that resolves when the item is successfully deleted.
     * @throws {ItemNotFoundException} - Thrown when an item with the specified ID is not found.
     */
    delete(id: id): Promise<void>;
}