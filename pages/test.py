# The closed-form equation used is: V(t) = Vdc + (2A/π) * arcsin(sin(2π f t))
import numpy as np
import matplotlib.pyplot as plt

A = 3.0          # amplitude (peak)
f = 1000.0       # frequency in Hz
Vdc = 1.0        # DC offset in V
T = 1.0 / f      # period in seconds

t = np.linspace(0, 2*T, 1000)
V = Vdc + (2*A/np.pi) * np.arcsin(np.sin(2*np.pi*f*t))

# Plot
plt.figure(figsize=(8, 3))
plt.plot(t * 1e3, V)  # time in ms on x-axis
plt.xlabel('Time (ms)')
plt.ylabel('V(t) (V)')
plt.title('Triangle wave: A = 3V, f = 1kHz, DC offset = 1V')
plt.grid(True)
plt.xlim(0, 2*T*1e3)
plt.ylim(Vdc - 1.2*A, Vdc + 1.2*A)
plt.tight_layout()
plt.show()
