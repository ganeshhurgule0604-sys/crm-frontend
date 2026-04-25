import "./form.css";

export default function Form({ params }) {
    return (
        <div className="form-container">
            {params.map((x, index) => (
                <div key={index} className="form-group">

                    {x.type !== "submit" && (
                        <label>{x.label || x.name}</label>
                    )}

                    {x.type === 'select' ? (
                        <select
                            name={x.name}
                            value={x.value || ""}
                            onChange={x.action}
                        >
                            <option value="">
                                Select {x.label || x.name}
                            </option>

                            {x.options?.map((opt) => {
                                const value = typeof opt === "object" ? opt.value : opt;
                                const label = typeof opt === "object" ? opt.label : opt;

                                return (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                );
                            })}
                        </select>

                    ) : x.type === 'radio' ? (
                        <div className="radio-group">
                            {x.options?.map((opt) => {
                                const value = typeof opt === "object" ? opt.value : opt;
                                const label = typeof opt === "object" ? opt.label : opt;

                                return (
                                    <label key={value}>
                                        <input
                                            type="radio"
                                            name={x.name}
                                            value={value}
                                            checked={x.value === value}
                                            onChange={x.action}
                                        />
                                        {label}
                                    </label>
                                );
                            })}
                        </div>

                    ) : x.type === 'submit' ? (
                        <button type="submit" className="submit-btn">
                            {x.value}
                        </button>

                    ) : (
                        <input
                            type={x.type}
                            value={x.value || ""}
                            onChange={x.action}
                            name={x.name}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}