<?php

namespace App\Livewire;

use App\Models\Todo;
use Illuminate\Database\Eloquent\Collection;
use Livewire\Attributes\Rule;
use Livewire\Component;
use Livewire\WithoutUrlPagination;
use Livewire\WithPagination;

class Todolist extends Component
{
    use WithPagination, WithoutUrlPagination;

    #[Rule('required|min:3|max:50')]
    public $name;
    public $importance;
    public function create()
    {
        $validated = $this->validateOnly('name');
        $user_id = auth()->user()->user_id;
        $valueImportance = $this->importance == null ? 1 : $this->importance;
        Todo::create([
            'name' => $validated['name'],
            'user_id' => $user_id,
            'importance' => $valueImportance
        ]);

        $this->reset();
        $this->resetPage();
    }



    public function delete($id)
    {
        Todo::destroy($id);
    }

    public function toggle($id)
    {
        $todo = Todo::find($id);
        $todo->completed = !$todo->completed;
        $todo->save();
    }

    public function render()
    {
        return view('livewire.todolist', [
            'todos' =>  Todo::latest()->where('user_id', auth()->user()->user_id)->paginate(5)
        ]);
    }
}
