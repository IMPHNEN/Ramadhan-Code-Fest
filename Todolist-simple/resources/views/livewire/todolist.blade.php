<div>

  <div class="box" style="margin-top: 10px;">
    <h1 class="d-flex justify-content-center mb-3">Todolist</h1>
      <div id="search-box" class="flex flex-col items-center px-2 my-4 justify-center">
        <div class="search-bar">
            <div style="position: relative;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2" style="width: 30px; height: 30px; position: absolute; top: 50%; transform: translateY(-50%);">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input type="text" placeholder="    Search..." class="bg-light ml-2 rounded px-4 py-2" style="background-color: #f8f9fa; padding-left: 40px;">
            </div>
            
          </div>
          
      </div>

              <div class="row">
                <div class="col-md-6">
                    <p> <label>Name Todolist</label><input wire:model='name' type="text" name="name" /> </p>
                    @error('name')
                        <span class="text-danger">{{ $message }}</span>
                    @enderror
                </div>
              
                <div class="col-md-2">
                    <p> <label name='importance' >Choose Importance:</label>
                        <select wire:model='importance' name="importance" >
                          <optgroup label="Importance">
                            <option value="Normal">Normal</option>
                            <option value="Important">Important</option>
                            <option value="Very Important">Very Important</option>
                          </optgroup>
                        </select>
                      </p>
                </div>
                
            </div>
            @forelse ($todos as $todo)
            <div class="cols">
              <div class="checkboxes mb-3" >
              <label for="c1">
                @if ($todo->completed)
                <input wire:click='toggle({{ $todo->id }})' type="checkbox" name="check" checked >
                @else
                <input wire:click='toggle({{ $todo->id }})' type="checkbox" name="check" >
                @endif
              <b>{{ $todo->name }} ({{ $todo->importance }})</b> &nbsp;{{ $todo->created_at }}</label>
              <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button> | <button wire:click='delete({{ $todo->id }})'  class="btn btn-danger">Delete</button>
              </div>
            </div>
            

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Todo</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-md-6">
                          <p> <label>Name Todolist</label><input wire:model='nameEdit' type="text" name="nameEdit" /> </p>
                      </div>
                      <div class="col-md-2">
                          <p> <label name='importance' >Choose Importance:</label>
                              <select wire:model='importanceEdit' name="importanceEdit" >
                                <optgroup label="Importance">
                                  <option value="Normal">Normal</option>
                                  <option value="Important">Important</option>
                                  <option value="Very Important">Very Important</option>
                                </optgroup>
                              </select>
                            </p>
                      </div>
                      
                  </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
           @empty
           <div class="checkboxes mb-3 d-flex justify-content-center">
            <label for="c1">
            <h1>No Have Data</h1></label>
              </div>
           @endforelse
            <p class="text-center"> <button wire:click.prevent='create'>Save</button></p>
            {{-- <p class="text-center"> <button class="alt">Clear</button></p> --}}
            
  </div>

  <div class="paginate">
    {{ $todos->links() }}
  </div>
</div>

