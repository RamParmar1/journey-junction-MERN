import Package from "../models/Package.js";

// Get all packages
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find({ available: true });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single package
export const getPackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create package (Admin only)
export const createPackage = async (req, res) => {
  try {
    const pkg = new Package(req.body);
    const savedPackage = await pkg.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update package (Admin only)
export const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(pkg);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete package (Admin only)
export const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};