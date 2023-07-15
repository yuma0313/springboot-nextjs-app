export async function getAllEmployeeData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}employees`, {
    credentials: "include",
  });
  const employees = await res.json();
  return employees;
}

export async function getEmployeeData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}employees/${id}`,
    {
      credentials: "include",
    }
  );
  const employee = await res.json();
  return employee;
}

export const postEmployeeData = async (employee) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const putEmployeeData = async (employee, id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}employees/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};
