import React from 'react'

export default function Addusertd() {
    return (
        <div>
                  <div class="mb-12">
        <label for="exampleFormControlInput1" class="form-label">
          Set Permissions
        </label>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">User Management</h5>
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">Create Role</th>
                  <td>
                    <input
                      type="radio"
                      id="huey"
                      name="drone"
                      value="huey"
                      checked
                    />
                    <label for="huey">View Only</label>
                  </td>
                  <td>
                    <input
                      type="radio"
                      id="huey"
                      name="drone"
                      value="huey"
                      checked
                    />
                    <label for="huey">No Access</label>
                  </td>
                  <td>
                    <input
                      type="radio"
                      id="huey"
                      name="drone"
                      value="huey"
                      checked
                    />
                    <label for="huey"> All Access</label>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Manage Role</th>
                  <td>
                    <input
                      type="radio"
                      id="huey1"
                      name="drone1"
                      value="huey1"
                      checked
                    />
                    <label for="huey">View Only</label>
                  </td>
                  <td>
                    <input
                      type="radio"
                      id="huey1"
                      name="drone1"
                      value="huey1"
                      checked
                    />
                    <label for="huey">No Access</label>
                  </td>
                  <td>
                    {" "}
                    <input
                      type="radio"
                      id="huey1"
                      name="drone1"
                      value="huey1"
                      checked
                    />
                    <label for="huey"> All Access</label>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Create Employee</th>
                  <td>
                    {" "}
                    <input
                      type="radio"
                      id="huey2"
                      name="drone2"
                      value="huey2"
                      checked
                    />
                    <label for="huey">View Only</label>
                  </td>
                  <td>
                    {" "}
                    <input
                      type="radio"
                      id="huey2"
                      name="drone2"
                      value="huey2"
                      checked
                    />
                    <label for="huey">No Access</label>
                  </td>
                  <td>
                    {" "}
                    <input
                      type="radio"
                      id="huey2"
                      name="drone2"
                      value="huey2"
                      checked
                    />
                    <label for="huey"> All Access</label>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Manage Employee</th>
                  <td>
                    {" "}
                    <input
                      type="radio"
                      id="huey3"
                      name="drone3"
                      value="huey3"
                      checked
                    />
                    <label for="huey">View Only</label>
                  </td>
                  <td>
                    {" "}
                    <input
                      type="radio"
                      id="huey3"
                      name="drone3"
                      value="huey3"
                      checked
                    />
                    <label for="huey">No Access</label>
                  </td>
                  <td>
                    {" "}
                    <input
                      type="radio"
                      id="huey3"
                      name="drone3"
                      value="huey3"
                      checked
                    />
                    <label for="huey"> All Access</label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
        </div>
    )
}
