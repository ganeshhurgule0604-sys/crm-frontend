export default function Form({ params }) {
    return (
        <>
            {params.map((x, index) => (
                <div key={index}>
                    <label>{x.name}</label>

                    {x.type === 'radio' ? (
                        x.options.map((opt) => (
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
                        ))
                    ) : x.type === 'submit' ? (
                        <button type="submit">{x.value}</button>
                    ) : (
                        <input
                            type={x.type}
                            value={x.value}
                            onChange={x.action}
                            name={x.name}
                        />
                    )}
                </div>
            ))}
        </>
    );
}