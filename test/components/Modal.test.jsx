import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../src/components/Modal';

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Test Modal',
    children: <div>Modal Content</div>,
  };

  it('debería renderizar el modal cuando isOpen es true', () => {
    render(<Modal {...defaultProps} />);
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('no debería renderizar nada cuando isOpen es false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('debería llamar onClose cuando se hace clic en el botón cerrar', () => {
    const onCloseMock = vi.fn();
    render(<Modal {...defaultProps} onClose={onCloseMock} />);
    
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('debería llamar onClose cuando se hace clic en el overlay', () => {
    const onCloseMock = vi.fn();
    render(<Modal {...defaultProps} onClose={onCloseMock} />);
    
    const overlay = document.querySelector('.absolute.inset-0');
    fireEvent.click(overlay);
    
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('debería mostrar el título correcto', () => {
    render(<Modal {...defaultProps} title="Mi Título Personalizado" />);
    
    expect(screen.getByText('Mi Título Personalizado')).toBeInTheDocument();
  });

  it('debería renderizar children correctamente', () => {
    const customChildren = (
      <div>
        <p>Párrafo 1</p>
        <p>Párrafo 2</p>
      </div>
    );
    
    render(<Modal {...defaultProps} children={customChildren} />);
    
    expect(screen.getByText('Párrafo 1')).toBeInTheDocument();
    expect(screen.getByText('Párrafo 2')).toBeInTheDocument();
  });

  it('debería tener las clases CSS correctas para el styling', () => {
    const { container } = render(<Modal {...defaultProps} />);
    
    const modalContainer = container.querySelector('.fixed.inset-0.z-50');
    expect(modalContainer).toBeInTheDocument();
    
    const modalContent = container.querySelector('.relative.bg-\\[\\#f2f2f2\\]');
    expect(modalContent).toBeInTheDocument();
  });
});
