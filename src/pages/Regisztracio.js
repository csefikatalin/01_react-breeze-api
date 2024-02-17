import React from "react";

export default function Regisztracio() {
    return (
        <div className=" m-auto" style={{ maxWidth: "400px" }}>
            <h1 className="text-center">Regisztráció</h1>
            <form>
                <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">
                        Név:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Név"
                        name="name"
                    />
                    <div>
                        <span className="text-danger">hiba</span>
                    </div>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="email"
                        name="email"
                    />
                    <div>
                        <span className="text-danger">hiba</span>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">
                        Jelszó:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="pwd"
                        placeholder="jelszó"
                        name="pwd"
                    />
                    <div>
                        <span className="text-danger">hiba</span>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd2" className="form-label">
                        Jelszó újra:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="pwd2"
                        placeholder="jelszó újra"
                        name="pwd2"
                    />
                    <div>
                        <span className="text-danger">hiba</span>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Regisztrálok
                </button>
            </form>
        </div>
    );
}
