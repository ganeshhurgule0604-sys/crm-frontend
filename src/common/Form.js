import "./form.css";

export default function Form({ params }) {
    return (
        <div className="form-container">
            {params.map((x, index) => (
                <div key={index} className="form-group">

                    {x.type !== "submit" && <label>{x.name}</label>}

                    {x.type === 'radio' ? (
                        <div className="radio-group">
                            {x.options.map((opt) => (
                                <label key={opt}>
                                    <input
                                        type="radio"
                                        name={x.name}
                                        value={opt}
                                        checked={x.value === opt}
                                        onChange={x.action}
                                    />
                                    {opt}
                                </label>
                            ))}
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