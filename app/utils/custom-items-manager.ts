import type { UploadType } from "~/components/upload-button";

export interface CustomItem {
  id: string;
  type: UploadType;
  dataUrl: string;
  name: string;
  timestamp: number;
}

class CustomItemsManager {
  private storageKey = "blobby-custom-items";
  private items: Map<string, CustomItem> = new Map();
  private isInitialized = false;

  constructor() {
    // Don't load from storage in constructor - wait for explicit init
  }

  private ensureInitialized() {
    if (!this.isInitialized && typeof window !== "undefined") {
      this.loadFromStorage();
      this.isInitialized = true;
    }
  }

  private loadFromStorage() {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const items = JSON.parse(stored) as CustomItem[];
        items.forEach(item => this.items.set(item.id, item));
      }
    } catch (error) {
      console.error("Failed to load custom items:", error);
    }
  }

  private saveToStorage() {
    if (typeof window === "undefined") return;

    try {
      const items = Array.from(this.items.values());
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save custom items:", error);
    }
  }

  async addItem(file: File, type: UploadType): Promise<CustomItem> {
    this.ensureInitialized();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const id = `custom-${type}-${Date.now()}`;

        const item: CustomItem = {
          id,
          type,
          dataUrl,
          name: file.name,
          timestamp: Date.now(),
        };

        this.items.set(id, item);
        this.saveToStorage();
        resolve(item);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      reader.readAsDataURL(file);
    });
  }

  getItemsByType(type: UploadType): CustomItem[] {
    this.ensureInitialized();
    return Array.from(this.items.values())
      .filter(item => item.type === type)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  removeItem(id: string) {
    this.ensureInitialized();
    this.items.delete(id);
    this.saveToStorage();
  }

  clearAll() {
    this.ensureInitialized();
    this.items.clear();
    this.saveToStorage();
  }
}

// Singleton instance - defer creation
let instance: CustomItemsManager | null = null;

export function getCustomItemsManager(): CustomItemsManager {
  if (!instance && typeof window !== "undefined") {
    instance = new CustomItemsManager();
  }
  // Always return an instance, even if it's a temporary one for SSR
  return instance || new CustomItemsManager();
}