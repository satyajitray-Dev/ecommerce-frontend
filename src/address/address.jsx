
import { useEffect, useState } from "react";

function Address() {
    const userid = localStorage.getItem("userId");

    const [address, setAddress] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const backurl = import.meta.env.VITE_BU;

    useEffect(() => {
        const getAddress = async () => {
            try {
                const res = await fetch(
                    `${backurl}/api/address/${userid}`
                );

                const data = await res.json();

                console.log("Address response:", data);

                if (data.success) {
                    setAddress(data.address || data.data || []);
                }
            } catch (err) {
                console.log(err);
                alert("Something went wrong");
            }
        };

        getAddress();
    }, [userid, editingId]);

    const addressUpdate = async (e, addressId) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const updateData = Object.fromEntries(formData);

        // Convert number fields from string to number
        updateData.pincode = Number(updateData.pincode);
        updateData.phone = Number(updateData.phone);

        // Convert checkbox value to boolean
        updateData.isDefault = updateData.isDefault === "true";

        console.log("Sending update:", updateData);

        try {
            const res = await fetch(
                `${backurl}/api/address/update/${userid}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateData),
                }
            );

            const data = await res.json();

            console.log("Update response:", data);

            if (data.success) {
                setAddress((prev) =>
                    prev.map((item) =>
                        item._id === addressId
                            ? {
                                ...item,
                                ...updateData,
                            }
                            : item
                    )
                );

                setEditingId(null);
            } else {
                alert(data.message || "Update failed");
            }
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="address-container">

            {address.length === 0 ? (
    <div className="address-empty">
        <p>No address found</p>

        <button
            className="add-address-button"
            onClick={() => navigate("/add-address")}
        >
            Add Address
        </button>
    </div>
) : (
                address.map((item) => (

                    <div
                        key={item._id}
                        className="address-card"
                    >

                        {editingId === item._id ? (

                            /* EDIT MODE */
                            <form
                                onSubmit={(e) =>
                                    addressUpdate(e, item._id)
                                }
                            >

                                

                                <div className="address-row">
                                    <span className="address-label">
                                        Address:
                                    </span>

                                    <input
                                        name="adressline"
                                        defaultValue={
                                            item.adressline || ""
                                        }
                                    />
                                </div>

                                <div className="address-row">
                                    <span className="address-label">
                                        Landmark:
                                    </span>

                                    <input
                                        name="landmark"
                                        defaultValue={
                                            item.landmark || ""
                                        }
                                    />
                                </div>

                                <div className="address-row">
                                    <span className="address-label">
                                        City:
                                    </span>

                                    <input
                                        name="city"
                                        defaultValue={
                                            item.city || ""
                                        }
                                    />
                                </div>

                                <div className="address-row">
                                    <span className="address-label">
                                        District:
                                    </span>

                                    <input
                                        name="District"
                                        defaultValue={
                                            item.District || ""
                                        }
                                    />
                                </div>

                                <div className="address-row">
                                    <span className="address-label">
                                        State:
                                    </span>

                                    <input
                                        name="state"
                                        defaultValue={
                                            item.state || ""
                                        }
                                    />
                                </div>

                                <div className="address-row">
                                    <span className="address-label">
                                        Pincode:
                                    </span>

                                    <input
                                        type="number"
                                        name="pincode"
                                        defaultValue={
                                            item.pincode || ""
                                        }
                                    />
                                </div>

                                <div className="address-row">
                                    <span className="address-label">
                                        Phone:
                                    </span>

                                    <input
                                        type="number"
                                        name="phone"
                                        defaultValue={
                                            item.phone || ""
                                        }
                                    />
                                </div>

                                <div className="address-row">
                                    <span className="address-label">
                                        Default Address:
                                    </span>

                                    <select
                                        name="isDefault"
                                        defaultValue={
                                            item.isDefault
                                                ? "true"
                                                : "false"
                                        }
                                    >
                                        <option value="true">
                                            Yes
                                        </option>

                                        <option value="false">
                                            No
                                        </option>
                                    </select>
                                </div>

                                <div className="address-buttons">
                                 <button type="submit" className="save-button">
                                    Save
                                </button>

                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => setEditingId(null)}
                                    >
                                    Cancel
                                    </button>
                                </div>

                            </form>

                        ) : (

                            /* VIEW MODE */
                            <>
                                <div className="address-row">
                                    <span className="address-label">
                                        Address:
                                    </span>

                                    <span className="address-value">
                                        {item.adressline}
                                    </span>
                                </div>

                                <div className="address-row">
                                    <span className="address-label">
                                        Landmark:
                                    </span>

                                    <span className="address-value">
                                        {item.landmark}
                                    </span>
                                </div>

                                <div className="address-row">
                                    <span className="address-label">
                                        City:
                                    </span>

                                    <span className="address-value">
                                        {item.city}
                                    </span>
                                </div>

                                <div className="address-row">
                                    <span className="address-label">
                                        District:
                                    </span>

                                    <span className="address-value">
                                        {item.District}
                                    </span>
                                </div>

                                <div className="address-row">
                                    <span className="address-label">
                                        State:
                                    </span>

                                    <span className="address-value">
                                        {item.state}
                                    </span>
                                </div>

                                <div className="address-row">
                                    <span className="address-label">
                                        Pincode:
                                    </span>

                                    <span className="address-value">
                                        {item.pincode}
                                    </span>
                                </div>

                                <div className="address-row">
                                    <span className="address-label">
                                        Phone:
                                    </span>

                                    <span className="address-value">
                                        {item.phone}
                                    </span>
                                </div>

                                <div className="address-row">
                                    <span className="address-label">
                                        Default:
                                    </span>

                                    <span className="address-value">
                                        {item.isDefault
                                            ? "Yes"
                                            : "No"}
                                    </span>
                                </div>

                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        setEditingId(item._id)
                                    }
                                >
                                    Edit Address
                                </button>
                            </>

                        )}

                    </div>

                ))
            )}

        </div>
    );
}

export default Address;